import React from 'react';
import Link from 'next/link';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';

export const metadata = {
  title: 'Termos de Uso - Passei no Concurso',
  description: 'Termos e Condições de Uso da plataforma Passei no Concurso.',
};

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <HomeHeader />

      <main className="flex-1 container mx-auto px-6 py-32 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white">
            Termos de Uso
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-300">
            <p className="text-sm text-slate-500">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar a plataforma <strong>Passei no Concurso</strong>, você concorda expressamente com estes Termos de Uso. 
                Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços. 
                Estes termos formam um contrato legalmente vinculante entre você (o "Usuário") e o Passei no Concurso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Uso Pessoal e Intransferível (Proibição de Rateio)</h2>
              <p>
                A sua conta no Passei no Concurso é de uso estritamente <strong>pessoal, individual e intransferível</strong>. 
                É terminantemente proibido o compartilhamento de dados de acesso (login e senha), revenda de contas, ou a prática conhecida como "rateio".
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>O acesso simultâneo por múltiplos dispositivos é monitorado pelo nosso sistema.</li>
                <li>A detecção de compartilhamento de conta resultará no <strong>bloqueio imediato e banimento definitivo</strong> do Usuário, sem direito a reembolso ou aviso prévio.</li>
                <li>A plataforma reserva-se o direito de tomar as medidas judiciais cabíveis em casos de pirataria ou distribuição ilegal de nosso conteúdo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Assinaturas, Compras e Cancelamentos</h2>
              <p>
                Nossos serviços são oferecidos mediante a aquisição de pacotes ou assinaturas específicas.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Direito de Arrependimento:</strong> Em conformidade com o Art. 49 do Código de Defesa do Consumidor, o Usuário tem o prazo de 7 (sete) dias corridos, contados a partir da data de liberação do acesso, para solicitar o cancelamento e a restituição integral do valor pago.</li>
                <li>Para pagamentos realizados por cartão de crédito, o estorno será processado junto à operadora do cartão. Para pagamentos via PIX ou Boleto, a restituição será feita em conta bancária de mesma titularidade.</li>
                <li>Após o prazo de 7 dias, não haverá reembolso proporcional em caso de cancelamento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Inteligência Artificial e Simulados (Isenção de Responsabilidade)</h2>
              <p>
                O Passei no Concurso utiliza tecnologias de Inteligência Artificial para gerar simulados e análises preditivas com foco em bancas específicas (CESGRANRIO, Cebraspe, FGV, etc).
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Nossas ferramentas analisam padrões passados para criar <strong>probabilidades</strong>, e não certezas.</li>
                <li>Nós <strong>não garantimos</strong> que as questões geradas em nossos simulados cairão idênticas na prova real.</li>
                <li>O Passei no Concurso não possui nenhum vínculo com as bancas examinadoras e não possui acesso a exames não publicados.</li>
                <li>O Usuário reconhece que a aprovação no concurso público depende exclusivamente do seu próprio esforço, estudo e dedicação. A plataforma é uma ferramenta de auxílio, não garantindo a aprovação.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Propriedade Intelectual</h2>
              <p>
                Todos os direitos relativos à plataforma e suas funcionalidades (código-fonte, design, logotipos, algoritmos, modelos de Inteligência Artificial e banco de questões) são de propriedade exclusiva do Passei no Concurso ou licenciados a nós.
              </p>
              <p>
                É proibida a reprodução, cópia, extração (scraping) ou engenharia reversa de qualquer parte da plataforma, sob pena de responsabilização civil e criminal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. Comunidade e Conduta</h2>
              <p>
                Onde a plataforma permitir interação entre os alunos (fóruns, ranking, comentários), o Usuário se compromete a manter o respeito. 
                Não serão tolerados:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Discurso de ódio, ofensas, assédio ou discriminação.</li>
                <li>Spam, correntes, ou propaganda de terceiros/concorrentes.</li>
                <li>O descumprimento pode acarretar na suspensão ou banimento da conta.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">7. Atualizações dos Termos</h2>
              <p>
                O Passei no Concurso poderá alterar estes Termos de Uso a qualquer momento. A continuação do uso da plataforma após as alterações será considerada como aceitação tácita dos novos termos.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <Link 
              href="/"
              className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full font-medium transition-colors"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
