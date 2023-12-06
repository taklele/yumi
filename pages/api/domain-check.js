// pages/api/domain-check.js
import { createTable } from './createTable'; // 确保路径正确
import { createUnavailableDomainResponse } from './createUnavailableDomainResponse'; // 确保路径正确
export default async function handler(req, res) {
  const { name, suffix } = req.query;

  try {
    const apiUrl = `https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`;
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();

    // Check if the domain is available
    if (data.available === true) {
      const tableHTML = createTable(data);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(tableHTML);
    }  else {
      const unavailableDomainHTML = createUnavailableDomainResponse(data);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(unavailableDomainHTML);
    }
  } catch (error) {
    // Handle the error
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
