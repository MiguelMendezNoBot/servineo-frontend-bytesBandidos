import React from 'react';
import { useTranslations } from 'next-intl';

export interface Metrics {
  total: number;
  active: number;
  cancelled: number;
  virtual: number;
  presential: number;
}

interface MetricsCardsProps {
  metrics: Metrics;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  const t = useTranslations('tracking.metrics');
  const { total, active, cancelled, virtual, presential } = metrics;
  const getPercentage = (count: number, totalBase: number) => {
    if (!totalBase || totalBase === 0) return 0;
    const pct = (count / totalBase) * 100;
    return pct > 100 ? 100 : pct; 
  };

  const realTotal = Math.max(active, (virtual + presential));
  
  const presentialPercentage = getPercentage(presential || 0, realTotal);
  const virtualPercentage = getPercentage(virtual || 0, realTotal);

  return (
    <div className='flex flex-col gap-4'>
      

      <div className='bg-white shadow-sm rounded p-4 border-l-4 border-blue-500'>
        <h3 className='text-lg font-semibold text-gray-800'>{t('total')}</h3>
        <p className='text-3xl font-bold text-blue-600'>{total}</p>
      </div>


      <div className='bg-white shadow-sm rounded p-4 border-l-4 border-green-500 flex flex-col'>
        
        <div className="flex justify-between items-center mb-3">
          <h3 className='text-lg font-semibold text-gray-800'>{t('scheduled')}</h3>
        
        </div>
        
        <div className="space-y-4">
          

          <div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Presencial</span>
              <span className="text-green-600 font-bold">{presential || 0}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"> 
              <div 
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${presentialPercentage}%` }}
              ></div>
            </div>
          </div>


          <div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
              <span>Virtual</span>
              <span className="text-cyan-600 font-bold">{virtual || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-cyan-600 h-3 rounded-full"
                style={{ width: `${virtualPercentage}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>


      <div className='bg-white shadow-sm rounded p-4 border-l-4 border-red-500'>
        <h3 className='text-lg font-semibold text-gray-800'>{t('cancelled')}</h3>
        <p className='text-3xl font-bold text-red-600'>{cancelled}</p>
      </div>

    </div>
  );
};

export default MetricsCards;