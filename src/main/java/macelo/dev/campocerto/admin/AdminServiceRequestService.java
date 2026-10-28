package macelo.dev.campocerto.admin;

import macelo.dev.campocerto.admin.dto.AdminServiceRequestResponse;
import macelo.dev.campocerto.common.dto.PageResponse;
import macelo.dev.campocerto.common.util.PageUtils;
import macelo.dev.campocerto.service.ServiceRequest;
import macelo.dev.campocerto.service.ServiceRequestRepository;
import macelo.dev.campocerto.service.ServiceRequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminServiceRequestService {

    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));

    private final ServiceRequestRepository requestRepository;

    public AdminServiceRequestService(ServiceRequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Transactional(readOnly = true)
    public PageResponse<AdminServiceRequestResponse> list(ServiceRequestStatus status, int page, int size) {
        Pageable pageable = PageUtils.pageable(page, size, NEWEST_FIRST);

        Page<ServiceRequest> result = status == null
                ? requestRepository.findAllBy(pageable)
                : requestRepository.findByStatus(status, pageable);

        return PageResponse.from(result, AdminServiceRequestResponse::from);
    }
}