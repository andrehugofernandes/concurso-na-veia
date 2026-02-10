import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function BackupPolicyCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Backup Policy</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Backup settings are currently disabled.</p>
            </CardContent>
        </Card>
    );
}
