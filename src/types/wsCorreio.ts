export interface ISolicitaXmlPlpResponseJson {
  "soap:Envelope": {
    $: {
      "xmlns:soap": string;
    };
    "soap:Body": [
      {
        "ns2:solicitaXmlPlpResponse": [
          {
            $: {
              "xmlns:ns2": string;
            };
            return: [string];
          },
        ];
      },
    ];
  };
}

export interface ISolicitaXmlPlpJson {
  correioslog: {
    tipo_arquivo: [string];
    versao_arquivo: [string];
    plp: [
      {
        id_plp: [string];
        valor_global: [string];
        mcu_unidade_postagem: [string];
        nome_unidade_postagem: [string];
        cartao_postagem: [string];
      },
    ];
    remetente: [
      {
        numero_contrato: [string];
        numero_diretoria: ["00075"];
        codigo_administrativo: [string];
        nome_remetente: [string];
        logradouro_remetente: [string];
        numero_remetente: [string];
        complemento_remetente: [string];
        bairro_remetente: [string];
        cep_remetente: [string];
        cidade_remetente: [string];
        uf_remetente: [string];
        telefone_remetente: [string];
        fax_remetente: [string];
        email_remetente: [string];
      },
    ];
    forma_pagamento: [string];
    objeto_postal: Array<{
      numero_etiqueta: [string];
      codigo_objeto_cliente: [string];
      codigo_servico_postagem: [string];
      cubagem: [string];
      peso: [string];
      rt1: [string];
      rt2: [string];
      destinatario: [
        {
          nome_destinatario: [string];
          telefone_destinatario: [string];
          celular_destinatario: [string];
          email_destinatario: [string];
          logradouro_destinatario: [string];
          complemento_destinatario: [string];
          numero_end_destinatario: [string];
        },
      ];
      nacional: [
        {
          bairro_destinatario: [string];
          cidade_destinatario: [string];
          uf_destinatario: [string];
          cep_destinatario: [string];
          codigo_usuario_postal: [string];
          centro_custo_cliente: [string];
          numero_nota_fiscal: [string];
          serie_nota_fiscal: [string];
          valor_nota_fiscal: [string];
          natureza_nota_fiscal: [string];
          descricao_objeto: [string];
          valor_a_cobrar: [string];
        },
      ];
      servico_adicional: [
        {
          valor_declarado: [string];
          codigo_servico_adicional: [string];
        },
      ];
      dimensao_objeto: [
        {
          tipo_objeto: [string];
          dimensao_altura: [string];
          dimensao_largura: [string];
          dimensao_comprimento: [string];
          dimensao_diametro: [string];
        },
      ];
      data_captacao: [string];
      data_postagem_sara: [string];
      status_processamento: [string];
      numero_comprovante_postagem: [string];
      valor_cobrado: [string];
    }>;
  };
}

export interface IRemetente {
  numero_contrato: string;
  numero_diretoria: string;
  codigo_administrativo: string;
  nome_remetente: string;
  logradouro_remetente: string;
  numero_remetente: string;
  complemento_remetente: "";
  bairro_remetente: string;
  cep_remetente: string;
  cidade_remetente: string;
  uf_remetente: string;
  telefone_remetente: string;
  fax_remetente: string;
  email_remetente: string;
}

export interface IObjetoPostal {
  numero_etiqueta: string;
  codigo_objeto_cliente: string;
  codigo_servico_postagem: string;
  cubagem: string;
  peso: string;
  rt1: string;
  rt2: string;
  destinatario: {
    nome_destinatario: string;
    telefone_destinatario: string;
    celular_destinatario: string;
    email_destinatario: string;
    logradouro_destinatario: string;
    complemento_destinatario: string;
    numero_end_destinatario: string;
  };
  nacional: {
    bairro_destinatario: string;
    cidade_destinatario: string;
    uf_destinatario: string;
    cep_destinatario: string;
    codigo_usuario_postal: string;
    centro_custo_cliente: string;
    numero_nota_fiscal: string;
    serie_nota_fiscal: string;
    valor_nota_fiscal: string;
    natureza_nota_fiscal: string;
    descricao_objeto: string;
    valor_a_cobrar: string;
  };
  servico_adicional: {
    valor_declarado: string;
    codigo_servico_adicional: string;
  };
  dimensao_objeto: {
    tipo_objeto: string;
    dimensao_altura: string;
    dimensao_largura: string;
    dimensao_comprimento: string;
    dimensao_diametro: string;
  };
  data_captacao: string;
  data_postagem_sara: string;
  status_processamento: string;
  numero_comprovante_postagem: string;
  valor_cobrado: string;
}

export interface IPlp {
  id_plp: string;
  valor_global: string;
  mcu_unidade_postagem: string;
  nome_unidade_postagem: string;
  cartao_postagem: string;
}

export interface ISolicitaXmlPlpSerialized {
  correioslog: {
    tipo_arquivo: string;
    versao_arquivo: string;
    plp: IPlp;
    remetente: IRemetente;
    forma_pagamento: string;
    objeto_postal: IObjetoPostal[];
  };
}
