function doPost(event) {
  const properties = PropertiesService.getScriptProperties();
  const expectedToken = properties.getProperty("WEBHOOK_TOKEN");
  let inquiry;

  try {
    inquiry = JSON.parse(event.postData.contents);
  } catch (error) {
    return jsonResponse({ success: false });
  }

  if (!inquiry || typeof inquiry !== "object") {
    return jsonResponse({ success: false });
  }

  if (!expectedToken || inquiry.token !== expectedToken) {
    return jsonResponse({ success: false });
  }

  const requiredFields = ["name", "email", "service", "message", "callDate", "callTime"];
  if (
    !requiredFields.every((field) => typeof inquiry[field] === "string") ||
    (inquiry.website !== undefined && typeof inquiry.website !== "string")
  ) {
    return jsonResponse({ success: false });
  }

  const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
  if (!spreadsheetId) {
    return jsonResponse({ success: false });
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName("Inquiries") || spreadsheet.insertSheet("Inquiries");
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          "Submitted at",
          "Name",
          "Email",
          "Website",
          "Service",
          "Project details",
          "Preferred date",
          "Preferred time",
        ]);
      }

      sheet.appendRow([
        new Date(),
        safeCell(inquiry.name),
        safeCell(inquiry.email),
        safeCell(typeof inquiry.website === "string" ? inquiry.website : ""),
        safeCell(inquiry.service),
        safeCell(inquiry.message),
        safeCell(inquiry.callDate),
        safeCell(inquiry.callTime),
      ]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: "info@juvetechmedia.co.ke",
      replyTo: inquiry.email,
      subject: "New JuveTech Media website inquiry",
      body: [
        "A new inquiry was submitted through the JuveTech Media website.",
        "",
        "Name: " + safeCell(inquiry.name),
        "Email: " + safeCell(inquiry.email),
        "Website: " + safeCell(typeof inquiry.website === "string" ? inquiry.website : ""),
        "Service: " + safeCell(inquiry.service),
        "Preferred date: " + safeCell(inquiry.callDate),
        "Preferred time: " + safeCell(inquiry.callTime),
        "",
        "Project details:",
        safeCell(inquiry.message),
      ].join("\n"),
    });

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Could not save or email an inquiry.", error);
    return jsonResponse({ success: false });
  }
}

function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
