import { useState, useEffect } from 'react';
import styles from '../public/css.css'; // Assuming this exists and is correctly configured

export default function Home() {
    const [domainInfo, setDomainInfo] = useState(null);
    const [tableHtml, setTableHtml] = useState(null);
    const [recentQueries, setRecentQueries] = useState([]);
  
    useEffect(() => {
      fetchRecentQueries();
    }, []);
  
    async function fetchRecentQueries() {
      try {
        const response = await fetch('/api/get-queries');
        const data = await response.json();
        setRecentQueries(data);
      } catch (error) {
        console.error('Error fetching recent queries:', error);
      }
    }
  
    async function addQueryToRecent(domain) {
      try {
        await fetch('/api/add-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: domain }),
        });
      } catch (error) {
        console.error('Error adding query to recent:', error);
      }
    }
    useEffect(() => {
        window.performDomainCheck = performDomainCheck;
      }, []);
    async function checkDomainAvailability(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const suffix = event.target.suffix.value;
        performDomainCheck(name, suffix);
      }
      
      async function performDomainCheck(name, suffix) {
        const fullDomain = `${name}.${suffix}`;  // 拼接完整的域名
      
        try {
          const response = await fetch(`/api/domain-check?name=${name}&suffix=${suffix}`);
          const contentType = response.headers.get('content-type');
          if (contentType.includes('application/json')) {
            const data = await response.json();
            setDomainInfo({ available: false, info: data.info });
          } else if (contentType.includes('text/html')) {
            const tableHTML = await response.text();
            setDomainInfo({ available: true });
            setTableHtml(tableHTML);
          } else {
            console.error('Unexpected response type:', contentType);
          }
      
          // 添加查询到最近的查询列表
          await addQueryToRecent(fullDomain);
          fetchRecentQueries(); // 更新最近查询列表
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
      
      function handleQueryClick(event) {
        event.preventDefault();
        const fullDomain = event.target.textContent;
        const [name, suffix] = fullDomain.split('.');
        performDomainCheck(name, suffix);
      }
  
    return (
    <div>
      <header>
        <div className="header-container">
            <img src="/logo.png" alt="域名查询注册系统" id="logo"  />
            <h1>VPSMUNDO 域名查询注册系统</h1>
        </div>
    </header>

      <form onSubmit={checkDomainAvailability} id="search-form">
        <input id="name" name="name" type="text" placeholder="Enter a domain name" required />
        <select id="suffix" name="suffix">
        <option value="com">.com</option>
            <option value="net">.net</option>
            <option value="org">.org</option>
            <option value="me">.me</option>
            <option value="xyz">.xyz</option>
            <option value="info">.info</option>
            <option value="io">.io</option>
            <option value="co">.co</option>
            <option value="ai">.ai</option>
            <option value="biz">.biz</option>
            <option value="us">.us</option>
        </select>
        <button type="submit">Check Availability</button>
        </form>
      <div id="instructions">
        {domainInfo && domainInfo.available === false ? (
          <p>{domainInfo.info}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        )}
      </div>
      <div className='domain-table'>
        <h2>最近查询</h2>
        <ul className="recent-queries">
        {recentQueries.map((query, index) => (
            <li key={index}>
              <a href="#" onClick={handleQueryClick}>{query}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}