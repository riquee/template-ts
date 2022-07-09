export const solicitaPlp = (plp: string, etiqueta: string) => {
  return `<soapenv:Envelope
          xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
          xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
      <soapenv:Header/>
      <soapenv:Body>
        <cli:solicitaPLP>
          <idPlpMaster>${plp}</idPlpMaster>
          <numEtiqueta>${etiqueta}</numEtiqueta>
          <usuario>EXITOINF</usuario>
          <senha>ndcz62</senha>
        </cli:solicitaPLP>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
};
