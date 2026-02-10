import Image from 'next/image'
interface Social {
  imgsrc: string;
  href: string;
  label: string;
}

const socialas: Social[] = [
  { imgsrc: "/images/Footer/x.svg", href: "https://x.com/jaboataoonline", label: "X (Twitter) da Prefeitura de Jaboatão" },
  { imgsrc: "/images/Footer/facebook.svg", href: "https://www.facebook.com/PrefeituradoJaboatao", label: "Facebook da Prefeitura de Jaboatão" },
  { imgsrc: "/images/Footer/insta.svg", href: "https://www.instagram.com/amorporjaboatao/", label: "Instagram da Prefeitura de Jaboatão" },
  { imgsrc: "/images/Footer/youtube.svg", href: "https://www.youtube.com/prefeiturajaboatao", label: "YouTube da Prefeitura de Jaboatão" },
];

const Footer = () => {
  return (
    <div className="relative w-full">
      
      {/* Topo amarelo */}
      <div>
        <Image
          src="/images/Footer/topo-rodape.png"
          alt="Topo"
          width={1920}
          height={50}
          className="w-full"
        />
      </div>

      {/* Fundo azul */}
      <div className="bg-[#002D9E] text-white w-full">
        {/* Grid principal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* COLUNA 1 */}
            <div className="text-left border-l-2 border-white pl-8 border-dotted">
              <h1 className="text-lg font-extrabold">MAPA DO SITE</h1>
              <div className="border-b border-b-white mb-2 mr-[320px]" />
              <div className="text-lightblue text-sm font-normal leading-6">
                <ul className="text-[14px] dark:text-white font-normal">
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapa-da-estrategia/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DA ESTRATÉGIA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://portaldatransparencia.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PORTAL DA TRANSPARÊNCIA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://portaldatransparencia.jaboatao.pe.gov.br/estrutura-organizacional/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ESTRUTURA ORGANIZACIONAL
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/galeria-de-elogios/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GALERIA DE ELOGIOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/servicos-para-o-cidadao/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CIDADÃO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/carta-de-servicos/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CARTAS DE SERVIÇO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/servicos-para-a-empresa/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EMPRESA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://servidor.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SERVIDOR
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/servicos-para-o-turista/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TURISTA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/ppp-saude/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PPP-SAUDE
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapa-das-escolas/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DAS ESCOLAS MUNICIPAIS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapas-das-unidades-de-saude-por-regional/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DAS UNIDADES DE SAÚDE POR REGIONAIS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapa-dos-bares-e-restaurantes/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DOS BARES E RESTAURANTES
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapa-mercados-publicos/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DOS MERCADOS PÚBLICOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/mapa-das-unidades-do-cras-e-creas-municipais/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MAPA DAS UNIDADES DO CRAS E CREAS MUNICIPAIS
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUNA 2 */}
            <div className="text-left border-l-2 border-white pl-8 border-dotted">
              <h1 className="text-lg font-extrabold">SITES RELACIONADOS</h1>
              <div className="border-b border-b-white mb-2 mr-[320px]"></div>
              <div className="text-lightblue text-sm font-normal leading-6">
                <ul className="text-[14px] dark:text-white font-normal">
                  <li>
                    <a
                      href="https://amorpor.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AMOR JABOATÃO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bemestaranimal.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BEM ESTAR ANIMAL
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://conselhodeusuarios.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CONSELHO DE USUÁRIOS
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://deolhonaconsulta.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DE OLHO NA CONSULTA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://diariooficial.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DIÁRIO OFICIAL
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://educacao.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EDUCAÇÃO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://economiacriativa.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ECONOMIA CRIATIVA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://emlume.com.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EMLUME
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://estacaobemestar.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ESTAÇÃO BEM ESTAR
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboataoemacao.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JABOATÃO EM AÇÃO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboataoprev.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JABOATAOPREV
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://semam.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MEIO AMBIENTE
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OFICIAL
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ouvidoria.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OUVIDORIA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tinus.com.br/csp/JABOATAO/portal/index.csp"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PORTAL DO CONTRIBUINTE
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://portaldatransparencia.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PORTAL DA TRANSPARÊNCIA
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://procon.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PROCON
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://servidor.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SERVIDOR
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://trabalho.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TRABALHO
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://viver.jaboatao.pe.gov.br/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIVER
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUNA 3 */}
            <div className="text-left border-l-2 border-white pl-8 border-dotted">
              <div>
                <h1 className="text-lg font-extrabold">OUVIDORIA</h1>
                <div className="border-b border-b-white mb-2 mr-[320px]"></div>
                <div className="text-lightblue text-sm font-normal leading-6 mb-4">
                  <p className="text-[14px] dark:text-white font-normal">
                    OUVIDORIA GERAL: 0800 081 8999 /<br /> (81) 9.9422-5177
                    <br /> ATENDIMENTO DE SEGUNDA A SEXTA-FEIRA,<br /> DAS 8H ÀS 14H
                    <br /> E-MAIL: ouvidoria@jaboatao.pe.gov.br
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-extrabold">ACESSIBILIDADE</h1>
                <div className="text-lightblue text-sm font-normal leading-6 mb-4">
                  <p className="text-[14px] dark:text-white font-normal">
                    <a
                      href="https://portaldatransparencia.jaboatao.pe.gov.br/informacoes-de-acessibilidade/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      INFORMAÇÕES
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-extrabold">NAVEGABILIDADE</h1>
                <div className="text-lightblue text-sm font-normal leading-6 mb-4">
                  <p className="text-[14px] dark:text-white font-normal">
                    <a
                      href="https://jaboatao.pe.gov.br/glossario/"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GLOSSÁRIO
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-lg font-extrabold">ACOMPANHE-NOS</h1>
                <div className="flex gap-2">
                  {socialas.map((items, i) => (
                    <a href={items.href} key={i} target="_blank" rel="noopener noreferrer" aria-label={items.label} title={items.label}>
                      <Image
                        src={items.imgsrc}
                        alt={items.label}
                        className="footer-icons"
                        width={32}
                        height={32}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé branco */}
      <div className="bg-white text-[#003476] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* COLUNA 1 */}
            <div className="flex justify-center items-center">
              <Image
                src={"/images/Logo/logo.png"}
                alt="logo-image"
                width={200}
                height={100}
                className="md:block"
              />
            </div>

            {/* COLUNA 2 */}
            <div className="text-center">
              <h1 className="text-sm font-medium italic mb-4">
                <strong>Palácio da Batalha</strong> <br />
                Av. Barreto de Menezes, 1648 – Prazeres <br />
                Jaboatão dos Guararapes – PE, CEP 54.310-310
              </h1>
            </div>

            {/* COLUNA 3 */}
            <div className="text-sm font-medium italic text-center md:text-right">
              <h1>
                <strong>Complexo Administrativo</strong> <br />
                Estr. da Batalha, 1200 – Jardim Jordão <br />
                Jaboatão dos Guararapes – PE, CEP 54315-570
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Direitos reservados */}
      <div className="bg-black text-white w-full py-2">
        <h3 className="text-center text-sm">
          Desenvolvido por: Secretaria Executiva de Governo Digital | SEGD
        </h3>
      </div>
    </div>
  );
};

export default Footer;
