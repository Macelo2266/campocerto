package macelo.dev.campocerto.provider.dto;

import macelo.dev.campocerto.provider.ProviderOffering;
import macelo.dev.campocerto.provider.ProviderProfile;
import macelo.dev.campocerto.provider.ProviderServiceArea;

import java.util.Comparator;
import java.util.List;

public record ProviderProfileResponse(
        Long id,
        String professionalName,
        String description,
        String whatsapp,
        String city,
        boolean available,
        Double ratingAverage,
        int ratingCount,
        List<String> serviceAreas,
        List<OfferingResponse> offerings
) {

    public record OfferingResponse(Long categoryId, String categoryName, String priceInfo) {
    }

    public static ProviderProfileResponse from(ProviderProfile profile) {
        List<String> areas = profile.getServiceAreas().stream()
                .map(ProviderServiceArea::getCity)
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .toList();

        List<OfferingResponse> offers = profile.getOfferings().stream()
                .map(ProviderProfileResponse::toOffering)
                .sorted(Comparator.comparing(OfferingResponse::categoryName, String.CASE_INSENSITIVE_ORDER))
                .toList();

        return new ProviderProfileResponse(
                profile.getId(),
                profile.getProfessionalName(),
                profile.getDescription(),
                profile.getWhatsapp(),
                profile.getCity(),
                profile.isAvailable(),
                averageOf(profile),
                profile.getRatingCount(),
                areas,
                offers
        );
    }

    // null = ainda sem avaliações (o frontend mostra "Novo", e não "0 estrelas")
    public static Double averageOf(ProviderProfile profile) {
        return profile.getRatingCount() == 0 ? null : profile.getRatingAvg().doubleValue();
    }

    private static OfferingResponse toOffering(ProviderOffering offering) {
        return new OfferingResponse(
                offering.getCategory().getId(),
                offering.getCategory().getName(),
                offering.getPriceInfo()
        );
    }
}
