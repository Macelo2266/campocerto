package macelo.dev.campocerto.provider;

import macelo.dev.campocerto.provider.dto.ProviderProfileResponse;

import java.util.List;

/**
 * O que qualquer visitante pode ver. O WhatsApp e demais dados do dono NÃO estão aqui, de propósito.
 */
public record ProviderPublicResponse(
        Long id,
        String professionalName,
        String description,
        String city,
        boolean available,
        Double ratingAverage,
        int ratingCount,
        List<String> serviceAreas,
        List<ProviderProfileResponse.OfferingResponse> offerings
) {

    public static ProviderPublicResponse from(ProviderProfile profile) {
        ProviderProfileResponse full = ProviderProfileResponse.from(profile);

        return new ProviderPublicResponse(
                full.id(),
                full.professionalName(),
                full.description(),
                full.city(),
                full.available(),
                full.ratingAverage(),
                full.ratingCount(),
                full.serviceAreas(),
                full.offerings()
        );
    }
}