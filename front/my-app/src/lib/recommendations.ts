type MoviePreferences = {
    genreId: string;
    runtimeGte?: number;
    runtimeLte?: number;
    releaseDateGte?: string;
    releaseDateLte?: string;
};


export async function getRecommendations(preferences: MoviePreferences) {
    const params = new URLSearchParams({
        with_genres: preferences.genreId,
    });

    if (preferences.runtimeGte) {
        params.append('with_runtime.gte', String(preferences.runtimeGte));
    }
    if (preferences.runtimeLte) {
        params.append('with_runtime.lte', String(preferences.runtimeLte));
    }
    if (preferences.releaseDateGte) {
        params.append('primary_release_date.gte', preferences.releaseDateGte);
    }
    if (preferences.releaseDateLte) {
        params.append('primary_release_date.lte', preferences.releaseDateLte);
    }
    
    try {
        const res = await fetch(`/api/recommendations?${params.toString()}`);
        const data = await res.json();
        return data.results || []; 
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        return [];
    }
}