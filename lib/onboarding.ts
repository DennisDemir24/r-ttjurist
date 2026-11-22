export const reviewLabels = {
  PENDING: "Väntar på granskning",
  APPROVED: "Godkänd",
  REJECTED: "Avslagen",
};

export function invitationLabel(invite: { acceptedAt: Date | null; revokedAt: Date | null; expiresAt: Date }) {
  if (invite.acceptedAt) return "Accepterad";
  if (invite.revokedAt) return "Återkallad";
  if (invite.expiresAt.getTime() <= Date.now()) return "Utgången";
  return "Väntar på svar";
}
