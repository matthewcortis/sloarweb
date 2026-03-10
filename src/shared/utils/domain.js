export const normalizeHost = (domain = "") => {
  const trimmedDomain = `${domain}`.trim();
  if (!trimmedDomain) return "";

  let candidateDomain = trimmedDomain;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(candidateDomain)) {
    candidateDomain = `https://${candidateDomain}`;
  }

  try {
    const parsedUrl = new URL(candidateDomain);
    return parsedUrl.hostname.toLowerCase().replace(/\.$/, "");
  } catch {
    return "";
  }
};

export const buildHostVariants = (host = "") => {
  if (!host) return [];

  const variants = new Set([host]);
  if (host.includes(".")) {
    if (host.startsWith("www.")) {
      variants.add(host.replace(/^www\./, ""));
    } else {
      variants.add(`www.${host}`);
    }
  }

  return Array.from(variants);
};

export const buildDomainCandidates = (domain = "") => {
  const host = normalizeHost(domain);
  if (!host) return [];

  const hostVariants = buildHostVariants(host);
  const candidates = new Set();

  hostVariants.forEach((hostVariant) => {
    candidates.add(hostVariant);
    candidates.add(`${hostVariant}/`);
    candidates.add(`https://${hostVariant}`);
    candidates.add(`https://${hostVariant}/`);
    candidates.add(`http://${hostVariant}`);
    candidates.add(`http://${hostVariant}/`);
  });

  return Array.from(candidates);
};

export const getCurrentDomain = () => {
  if (typeof window === "undefined") return "";
  return normalizeHost(window.location.hostname || window.location.origin);
};

export const resolveByDomainCandidates = async (domain, resolver) => {
  if (typeof resolver !== "function") return null;

  const domainCandidates = buildDomainCandidates(domain);
  for (const domainCandidate of domainCandidates) {
    const resolvedValue = await resolver(domainCandidate);
    if (resolvedValue !== null && resolvedValue !== undefined && resolvedValue !== "") {
      return resolvedValue;
    }
  }

  return null;
};
