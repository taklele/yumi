export function createTable(data) {
    const domainname = data.name
    const domainsuffix = data.suffix
    const tableHTML = `
      <div class="domain-table">
        <div class="domain-header">域名未注册，推荐以下域名注册商</div>
        <div class="domain-row">
          <div class="domain-cell"><a href="https://www.namesilo.com/domain/search-domains?rid=090fa45qc&query=${domainname}&tlds=${domainsuffix}+xyz+top+net+org+club+info+life"  target="_blank">Namesilo</div>
        </div>
      </div>
    `;
    return tableHTML;
  }
  