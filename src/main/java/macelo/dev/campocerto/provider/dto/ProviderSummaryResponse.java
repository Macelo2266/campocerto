package macelo.dev.campocerto.provider.dto;

import macelo.dev.campocerto.provider.ProviderProfile;

import java.util.List;

public record ProviderSummaryResponse(
        Long id,
        String professionalName,
        String city,
        String shortDescription,
        List<String> categories,
        boolean available
) {

    private static final int MAX_DESCRIPTION = 160;

    public static ProviderSummaryResponse from(ProviderProfile profile) {
        List<String> categories = profile.getOfferings().stream()
                .map(offering -> offering.getCategory().getName())
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .toList();

        return new ProviderSummaryResponse(
                profile.getId(),
                profile.getProfessionalName(),
                profile.getCity(),
                shorten(profile.getDescription()),
                categories,
                profile.isAvailable()
        );
    }

    private static String shorten(String text) {
        if (text == null || text.length() <= MAX_DESCRIPTION) {
            return text;
        }
        return text.substring(0, MAX_DESCRIPTION - 3) + "...";
    }
}