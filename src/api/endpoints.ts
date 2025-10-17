export const ENDPOINTS = {
  games: {
    list: '/games',
    add: '/games',
    // byId: (id: string) => `/games/${id}`,
    // deleteById: (id: string) => `/games/${id}`,
    updateById: (id: string) => `/games/${id}`,
    searchByName: (name: string) => `/search?search=${name}`
  },
  user: {
    signup: "/signup",
    signin: "/signin",
    // profile: "/profile"
    // stats: "/stats"
  },
} as const