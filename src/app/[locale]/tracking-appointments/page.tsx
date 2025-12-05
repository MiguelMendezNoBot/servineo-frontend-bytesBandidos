'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// 🟢 1. IMPORTAR AMBOS HOOKS
import {
  useGetMapLocationsQuery,
  useGetTrackingMetricsQuery,
  useGetFixerStatsQuery,
  useGetAppointmentTypesCountQuery, // <--- ESTE ES EL NUEVO IMPORTANTE
} from '@/app/redux/services/trackingAppointmentsApi';

import FixerStatsTable from '@/Components/Statistics-panel/fixer-stats-table';
import MetricsCards from '@/Components/Statistics-panel/metrics-cards';

// ... (Tus interfaces ApiAppointment y MappedAppointment siguen igual, no las toco) ...
interface ApiAppointment {
  _id: string;
  lat: string | number;
  lon: string | number;
  fixerName?: string;
  requesterName?: string;
  current_requester_name?: string;
  date?: string;
  starting_time?: string;
  status?: string;
  schedule_state?: string;
}

interface MappedAppointment {
  id: string;
  fixerName: string;
  requesterName: string;
  date: string;
  status: string;
  lat: number;
  lng: number;
  service: string;
}

const AdminMap = dynamic(() => import('@/Components/Statistics-panel/admin-map'), {
  ssr: false,
  loading: () => (
    <div className='h-full w-full bg-gray-100 flex items-center justify-center text-gray-500 animate-pulse'>
      <span id='map-loading-text'></span>
    </div>
  ),
});

const StatisticsPage: React.FC = () => {
  const t = useTranslations('tracking');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 🟢 2. LLAMADA A: MÉTRICAS GENERALES (Total, Activas, Canceladas)
  const { data: generalMetrics = { total: 0, active: 0, cancelled: 0 } } = useGetTrackingMetricsQuery({
    startDate,
    endDate,
  });

  // 🟢 3. LLAMADA A: TIPOS (Virtual, Presencial)
  // Nota: Si tu definición de API dice que no recibe argumentos, déjalo vacío (). 
  // Si los acepta, pásale { startDate, endDate }. Por ahora lo dejo vacío para que no falle.
  const { data: typesDataRaw } = useGetAppointmentTypesCountQuery({ 
    startDate, 
    endDate 
  });

  // 🟢 4. FUSIÓN DE DATOS (EL TRUCO)
  // Creamos un objeto que tenga TODO junto para que la tarjeta no se quede en 0
  const combinedMetrics = {
    total: generalMetrics.total || 0,
    active: generalMetrics.active || 0,
    cancelled: generalMetrics.cancelled || 0,
    // Aquí sacamos los datos del segundo endpoint. 
    // Usamos 'any' porque tu interfaz de TS cree que es un array, pero el backend manda objeto.
    virtual: (typesDataRaw as any)?.virtual || 0,
    presential: (typesDataRaw as any)?.presential || 0
  };

  const { data: rawMapData = [], isLoading: loadingMap } = useGetMapLocationsQuery();
  const { data: fixerStats = [] } = useGetFixerStatsQuery();

  React.useEffect(() => {
    const loadingElement = document.getElementById('map-loading-text');
    if (loadingElement) {
      loadingElement.textContent = t('map.loading');
    }
  }, [t]);

  const filteredAppointments = React.useMemo(() => {
    if (!rawMapData) return [];
    return (
      (rawMapData as ApiAppointment[])
        .map((app): MappedAppointment => {
          const jitterAmount = 0.0002;
          const randomLat = (Math.random() - 0.5) * jitterAmount;
          const randomLng = (Math.random() - 0.5) * jitterAmount;
          return {
            id: app._id,
            fixerName: app.fixerName || t('map.unknown'),
            requesterName: app.requesterName || app.current_requester_name || t('map.client'),
            date: app.date || app.starting_time || '',
            status: app.status || app.schedule_state || 'unknown',
            lat: Number(app.lat) + randomLat,
            lng: Number(app.lon) + randomLng,
            service: '',
          };
        })
        .filter((app) => !isNaN(app.lat) && !isNaN(app.lng))
        .filter((app) => {
          if (!startDate || !endDate) return true;
          const appointmentDate = new Date(app.date);
          const start = new Date(startDate);
          const end = new Date(endDate);
          end.setHours(23, 59, 59);
          return appointmentDate >= start && appointmentDate <= end;
        })
    );
  }, [rawMapData, startDate, endDate, t]);

  return (
    <div className='w-full min-h-screen bg-gray-50 pb-10'>
      <div className='max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8'>
        {/* ENCABEZADO Y FILTROS */}
        <div className='bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>{t('title')}</h1>
            <p className='text-gray-500 text-sm'>{t('subtitle')}</p>
          </div>

          <div className='flex flex-wrap gap-3 items-end'>
            <div>
              <label className='text-xs text-gray-500 block mb-1 font-medium'>{t('filters.from')}</label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div>
              <label className='text-xs text-gray-500 block mb-1 font-medium'>{t('filters.to')}</label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 lg:h-[550px]'>
          
          {/* MAPA */}
          <div className='lg:col-span-3 bg-white rounded-xl shadow border border-gray-200 overflow-hidden relative z-0 h-[400px] lg:h-full'>
            {loadingMap ? (
              <div className='h-full w-full flex items-center justify-center text-gray-500'>
                {t('map.loadingData')}
              </div>
            ) : filteredAppointments.length > 0 ? (
              <AdminMap appointments={filteredAppointments} />
            ) : (
              <div className='h-full w-full flex flex-col items-center justify-center text-gray-400'>
                <p>{t('map.noAppointments')}</p>
              </div>
            )}
          </div>

          {/* BARRA LATERAL DERECHA */}
          <div className='lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto pr-1'>
            
            {/* 🟢 5. AQUÍ USAMOS LA VARIABLE COMBINADA */}
            <div className='shrink-0'>
              <MetricsCards metrics={combinedMetrics} />
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div className='w-full'>
          <FixerStatsTable stats={fixerStats} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;