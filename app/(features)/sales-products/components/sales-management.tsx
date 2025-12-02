"use client";

import { useEffect, useState } from "react";
import SalesTable, { Sale } from "./sales-table";
import SectionCards from "./section-cards";

type SalesStats = {
  ingresosTotales: number;
  totalVentas: number;
  productosVendidos: number;
};

function SalesManagement() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<SalesStats>({
    ingresosTotales: 0,
    totalVentas: 0,
    productosVendidos: 0,
  });

  const loadSales = async () => {
    try {
      const response = await fetch("http://10.50.50.12:3003/api/ventas");
      if (!response.ok) {
        throw new Error("No se pudieron cargar las ventas");
      }

      const data = await response.json();
      if (data?.ventas && Array.isArray(data.ventas)) {
        setSales(data.ventas);
      } else if (Array.isArray(data)) {
        setSales(data);
      } else {
        setSales([]);
      }
    } catch (error) {
      setSales([]);
      console.error(error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch("http://10.50.50.12:3003/api/ventas/estadisticas/resumen");
      if (!response.ok) {
        throw new Error("No se pudieron cargar las estadísticas");
      }

      const data = await response.json();
      setStats({
        ingresosTotales: data.ingresosTotales || 0,
        totalVentas: data.totalVentas || 0,
        productosVendidos: data.productosVendidos || 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    loadSales();
    loadStats();
  };

  useEffect(() => {
    loadSales();
    loadStats();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards
            ingresosTotales={stats.ingresosTotales}
            totalVentas={stats.totalVentas}
            productosVendidos={stats.productosVendidos}
          />
          <div>
            <SalesTable data={sales} onCreated={handleRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesManagement;
