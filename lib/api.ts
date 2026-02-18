// Helper to fetch from API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchFromApi(endpoint: string, page: number = 1, pageSize: number = 20, filters?: Record<string, string>) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...filters, 
    });

    const res = await fetch(`${API_BASE_URL}/${endpoint}?${params.toString()}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
        // If API fails, return empty structure to handle gracefully
        return { data: [], total: 0 };
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return { data: [], total: 0 };
  }
}

export async function fetchSingleFromApi(endpoint: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
        return null; // Handle 404 or error
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error fetching single ${endpoint}:`, error);
    return null;
  }
}
