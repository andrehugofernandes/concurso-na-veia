const fs = require('fs');
const path = 'src/components/aulas/shared.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '  completionBadgeText?: string;\n  children?: React.ReactNode;',
  '  completionBadgeText?: string;\n  canComplete?: boolean;\n  lockMessage?: string;\n  children?: React.ReactNode;'
);

content = content.replace(
  '  completionBadgeText,\n  children,\n}: {',
  '  completionBadgeText,\n  canComplete = true,\n  lockMessage,\n  children,\n}: {'
);

const buttonRegex = /<Button\s+size="lg"\s+onClick=\{onComplete\}\s+disabled=\{loading\}\s+className="[^"]+"\s*>\s*\{loading \? "Processando\.\.\." : "MARCAR COMO CONCLUÍDA"\}\s*<\/Button>/;

const replacement = `{!canComplete && (
                        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive font-medium text-sm flex items-center gap-2 text-left">
                          <LuInfo className="w-6 h-6 shrink-0" />
                          <span>{lockMessage || "Você precisa concluir todos os quizzes e desafios para finalizar esta aula."}</span>
                        </div>
                      )}

                      <Button
                        size="lg"
                        onClick={onComplete}
                        disabled={loading || !canComplete}
                        className="h-16 px-12 text-xl font-black rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                      >
                        {loading ? "Processando..." : "MARCAR COMO CONCLUÍDA"}
                      </Button>`;

content = content.replace(buttonRegex, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated shared.tsx');
