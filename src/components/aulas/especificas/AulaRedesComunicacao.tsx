'use client';

import React from 'react';
import AulaProtocolosTcpip from './AulaProtocolosTcpip';
import { AulaProps } from '../shared';

export default function AulaRedesComunicacao(props: AulaProps) {
  return <AulaProtocolosTcpip {...props} />;
}
