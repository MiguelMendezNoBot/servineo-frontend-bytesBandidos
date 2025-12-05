import React from 'react';
import { useTranslations } from 'next-intl';
import { FixerStat } from '@/app/redux/services/trackingAppointmentsApi';

interface FixerStatsTableProps {
  stats: FixerStat[];
  loading?: boolean;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

const FixerStatsTable: React.FC<FixerStatsTableProps> = ({ 
  stats, 
  loading = false,
  searchTerm = '',
  onSearchChange 
}) => {

  const t = useTranslations('tracking.table');

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
      
      <div className='p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4'>
        <h3 className='text-lg font-bold text-gray-800'>{t('title')}</h3>
        
        {onSearchChange && (
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-all"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-gray-50 text-gray-600 text-xs uppercase tracking-wider'>
              <th className='p-4 font-semibold'>{t('fixer')}</th>
              <th className='p-4 font-semibold text-center'>{t('total')}</th>
              <th className='p-4 font-semibold text-center'>{t('active')}</th>
              <th className='p-4 font-semibold text-center'>{t('cancelled')}</th>
              <th className='p-4 font-semibold text-center'>{t('rescheduled')}</th>
              <th className='p-4 font-semibold text-center'>{t('rate')}</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              // Loading Skeleton
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                  <td className="p-4" colSpan={5}><div className="h-4 bg-gray-200 rounded w-full"></div></td>
                </tr>
              ))
            ) : stats.length > 0 ? (
              stats.map((row) => (
                <tr key={row.id} className='hover:bg-gray-50 transition-colors text-sm text-gray-700'>
                  <td className='p-4 font-medium text-gray-900'>{row.name}</td>
                  <td className='p-4 text-center font-bold'>{row.total}</td>
                  <td className='p-4 text-center text-green-600 font-medium'>{row.active}</td>
                  <td className='p-4 text-center text-red-500 font-medium'>{row.cancelled}</td>
                  <td className='p-4 text-center text-orange-500'>{row.rescheduled}</td>
                  <td className='p-4 text-center text-gray-500'>{row.rate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No hay datos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixerStatsTable;