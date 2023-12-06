export function createUnavailableDomainResponse(data) {
    const whoisInfo = data.info || 'Whois info not available';
    const domainSuffix = data.suffix;
    const domainName = data.name;
    const supportedSuffixes = ['com', 'net', 'org', 'me', 'xyz', 'info', 'io', 'co', 'ai', 'biz', 'us'];
  
    const recommendedDomains = supportedSuffixes
      .filter(suffix => suffix !== domainSuffix)
      .map(suffix => `<span><a href="#" onclick="performDomainCheck('${domainName}', '${suffix}')">${domainName}.${suffix}</a></span>`)
      .join('');
  
    return `
      <div class="domain-info-container">
        <div class="domain-info-header">${domainName}.${domainSuffix} 已注册，推荐尝试以下域名：</div>
        <div class="domain-info-list">
          ${recommendedDomains}
        </div>
        <div class="domain-whois-header">域名Whois信息</div>
        <div class="domain-whois-content">${whoisInfo}</div>
      </div>
    `;
  }
  