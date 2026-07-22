import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function VerifiedPage({
    searchParams,
}: {
    searchParams: { next?: string }
}) {
    const nextPath = searchParams.next || "/dashboard"

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-xl">Email Verificado!</CardTitle>
                        <CardDescription>
                            Sua conta foi confirmada com sucesso. Você já pode acessar a plataforma.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center text-sm text-muted-foreground">
                            Obrigado por se juntar ao Concurso Na Veia AI.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href={nextPath} className="w-full">
                            <Button className="w-full">
                                Continuar para o Dashboard
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
