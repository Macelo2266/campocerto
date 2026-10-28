package macelo.dev.campocerto.admin.dto;


import macelo.dev.campocerto.service.ServiceRequestStatus;

import java.util.Map;

public record AdminStatsResponse(
        UserStats users,
        ProviderStats providers,
        Map<ServiceRequestStatus, Long> serviceRequests,
        ReviewStats reviews
) {

    public record UserStats(long total, long farmers, long providers, long admins,
                            long active, long suspended, long blocked) {
    }

    public record ProviderStats(long total, long available) {
    }

    public record ReviewStats(long visible, long hidden, Double averageRating) {
    }
}