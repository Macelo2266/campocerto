package macelo.dev.campocerto.provider.dto;

import br.com.campocerto.provider.ProviderOffering;
import br.com.campocerto.provider.ProviderProfile;
import br.com.campocerto.provider.ProviderServiceArea;

import java.util.Comparator;
import java.util.List;

public record ProviderProfileResponse(
        Long id,
        String professionalName,
        String description,
        String whatsapp,
        String city,
        boolean available,
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
                areas,
                offers
        );
    }

    private static OfferingResponse toOffering(ProviderOffering offering) {
        return new OfferingResponse(
                offering.getCategory().getId(),
                offering.getCategory().getName(),
                offering.getPriceInfo()
        );
    }
}