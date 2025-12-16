'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const DocumentViewer = () => {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Header with logo */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-primary text-white flex items-center px-4 z-10">
        <a href="/">
          <Image src="/_nuxt/img/logo_blanco_2024.77b442a.png" alt="Logo" width={165} height={40} className="pt-2" />
        </a>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-12 pb-16 px-4 max-w-3xl mx-auto w-full">
        {/* Issuer and signer details */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h4 className="text-lg font-semibold mb-2">
            El siguiente documento fue emitido por la <strong>Contraloría General del Estado</strong>
          </h4>
          <p>Datos del/los Firmante(s):</p>
          <ul className="list-disc pl-5">
            <li>
              NOMBRE: <strong>RAFAEL MARTIN PORCEL DE LA BARRA</strong>
            </li>
          </ul>
        </div>

        {/* PDF viewer section */}
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2">
            <span>Página</span>
            <span>1 / 1</span>
          </div>
          <div className="flex gap-2 mb-2">
            <Button disabled variant="secondary">Página Anterior</Button>
            <Button disabled variant="secondary">Página Siguiente</Button>
          </div>
          <div className="bg-gray-200 w-full max-w-lg h-[500px] flex items-center justify-center rounded shadow-inner">
            <canvas id="app-pdf-viewer" className="shadow-md" width={979} height={1267}>
              Cargando PDF, espere por favor...
            </canvas>
          </div>
        </div>

        {/* Exit button */}
        <div className="flex justify-end mt-4">
          <Button variant="default" className="gap-2">
            <i className="mdi mdi-exit-run"></i>
            SALIR
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 text-white flex items-center justify-center text-sm">
        2025 — Contraloría General del Estado
      </footer>
    </div>
  );
};

export default DocumentViewer;
