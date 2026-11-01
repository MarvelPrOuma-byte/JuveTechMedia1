export const inquiryWhatsAppNumber = "254757544494";

export type InquiryDetails = {
  name: string;
  email: string;
  website?: string;
  service: string;
  message: string;
  callDate: string;
  callTime: string;
};

export function buildInquiryWhatsAppUrl(details: InquiryDetails) {
  const message = [
    "Strategy call request",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    ...(details.website ? [`Website: ${details.website}`] : []),
    `Service: ${details.service}`,
    `Requested date: ${details.callDate}`,
    `Requested time: ${details.callTime} EAT`,
    `Project details: ${details.message}`,
  ].join("\n");

  return `https://wa.me/${inquiryWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
