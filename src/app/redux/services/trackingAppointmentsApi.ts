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

export interface FixerByNameResponse {
  fixerId: string;
  fixerName: string;
  stats: {
    total_citas: number;
    activas: number;
    canceladas: number;
    reprogramadas: number;
    tasa_cancelacion: string;
  };
}

export interface AppointmentTypesResponse {
  virtual: number;
  presential: number;
  [key: string]: number;
}

interface FilterArgs {
  startDate?: string;
  endDate?: string;
}

export const trackingAppointmentsApi = baseApi.injectEndpoints({
  overrideExisting: true,
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

    getAppointmentTypesCount: builder.query<AppointmentTypesResponse, FilterArgs>({
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

    getFixerStatsByName: builder.query<FixerStat[], string>({
      query: (name) => ({
        url: `/admin/fixer-stats-by-name?name=${name}`,
        method: 'GET',
      }),
      providesTags: ['Statistics'],

      transformResponse: (response: FixerByNameResponse) => {
        if (!response || !response.stats) return [];

        return [{
          id: response.fixerId,
          name: response.fixerName,
          total: response.stats.total_citas,
          active: response.stats.activas,
          cancelled: response.stats.canceladas,
          rescheduled: response.stats.reprogramadas,
          rate: response.stats.tasa_cancelacion
        }];
      },
    }),
  }),
});

export const {
  useGetMapLocationsQuery,
  useGetTrackingMetricsQuery,
  useGetFixerStatsQuery,
  useGetAppointmentTypesCountQuery,
  useGetFixerStatsByNameQuery
} = trackingAppointmentsApi;