import { baseApi } from './baseApi';

export interface MapLocation {
  _id: string;
  lat: string;
  lon: string;
  schedule_state: 'booked' | 'cancelled';
  fixerName: string;
  current_requester_name: string;
  starting_time: string;
}

export interface TrackingMetrics {
  total: number;
  active: number;
  cancelled: number;
  // Estos son necesarios para que no falle la tarjeta
  virtual: number;
  presential: number;
}

export interface FixerStat {
  id: string;
  name: string;
  total: number;
  active: number;
  cancelled: number;
  rescheduled: number;
  rate: string;
}

interface FilterArgs {
  startDate?: string;
  endDate?: string;
}

export const trackingAppointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMapLocations: builder.query<MapLocation[], void>({
      query: () => ({
        url: '/admin/map-locations',
        method: 'GET',
      }),
      providesTags: ['Statistics'],
    }),

    getTrackingMetrics: builder.query<TrackingMetrics, FilterArgs>({
      query: ({ startDate, endDate }) => {
        const url = '/admin/metrics';
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const queryString = params.toString();
        return {
          url: queryString ? `${url}?${queryString}` : url,
          method: 'GET',
        };
      },
      providesTags: ['Statistics'],
    }),

    getFixerStats: builder.query<FixerStat[], void>({
      query: () => ({
        url: '/admin/fixer-stats',
        method: 'GET',
      }),
      providesTags: ['Statistics'],
    }),

    // --- ESTE ES EL ENDPOINT QUE FALTABA ---
    getAppointmentTypesCount: builder.query<any, FilterArgs>({ 
      query: ({ startDate, endDate }) => {
        const url = '/admin/types-count';
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const queryString = params.toString();
        return {
          url: queryString ? `${url}?${queryString}` : url,
          method: 'GET',
        };
      },
      providesTags: ['Statistics'],
    }),
    // ---------------------------------------

    getFixerStatsByName: builder.query<FixerStat[], string>({
      query: (name) => ({
        url: `/admin/fixer-stats-by-name?name=${name}`, 
        method: 'GET',
      }),
      providesTags: ['Statistics'],
    }),
  }),
});

// --- AQUÍ ESTÁ LA SOLUCIÓN DEL ERROR ---
// Tienes que exportar useGetAppointmentTypesCountQuery para poder usarlo en los otros archivos
export const { 
  useGetMapLocationsQuery, 
  useGetTrackingMetricsQuery, 
  useGetFixerStatsQuery,
  useGetAppointmentTypesCountQuery, // <--- ¡ESTO ES LO QUE TE FALTA!
  useGetFixerStatsByNameQuery
} = trackingAppointmentsApi;