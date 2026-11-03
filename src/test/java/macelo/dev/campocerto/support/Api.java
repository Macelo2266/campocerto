package macelo.dev.campocerto.support;

import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.PathNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.StandardCharsets;
import java.util.List;

/** Pequeno cliente de HTTP simulado: faz os testes lerem como uma conversa com a API. */
public final class Api {

    /** Resposta: código HTTP, corpo (texto) e leitores de JSON por caminho (JsonPath). */
    public record Response(int status, String body) {

        public Object json(String path) {
            return JsonPath.read(body, path);
        }

        public String text(String path) {
            Object value = json(path);
            return value == null ? null : value.toString();
        }

        public long number(String path) {
            return ((Number) json(path)).longValue();
        }

        public double decimal(String path) {
            return ((Number) json(path)).doubleValue();
        }

        @SuppressWarnings("unchecked")
        public List<Object> list(String path) {
            return (List<Object>) json(path);
        }

        /** O campo existe? (um campo presente com valor null também conta como existente) */
        public boolean has(String path) {
            try {
                JsonPath.read(body, path);
                return true;
            } catch (PathNotFoundException e) {
                return false;
            }
        }
    }

    private final MockMvc mvc;

    public Api(MockMvc mvc) {
        this.mvc = mvc;
    }

    /**
     * @param urlTemplate use {nome} para valores que precisam de codificação (acentos, %, espaços);
     *                    eles entram em {@code vars}. Nunca escreva "%25" à mão no endereço.
     */
    public Response call(HttpMethod method, String token, String urlTemplate, String json, Object... vars) {
        MockHttpServletRequestBuilder request = MockMvcRequestBuilders.request(method, urlTemplate, vars);

        if (token != null) {
            request.header(HttpHeaders.AUTHORIZATION, "Bearer " + token);
        }
        if (json != null) {
            request.contentType(MediaType.APPLICATION_JSON).content(json);
        }

        try {
            MockHttpServletResponse response = mvc.perform(request).andReturn().getResponse();
            // UTF-8 explícito: sem isso, "não" chegaria como "nÃ£o" e as mensagens não bateriam
            return new Response(response.getStatus(), response.getContentAsString(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new IllegalStateException("Falha ao chamar " + method + " " + urlTemplate, e);
        }
    }

    // Sem login
    public Response get(String url, Object... vars) {
        return call(HttpMethod.GET, null, url, null, vars);
    }

    public Response post(String url, String json) {
        return call(HttpMethod.POST, null, url, json);
    }

    // "As" = autenticado (token no cabeçalho Authorization)
    public Response getAs(String token, String url, Object... vars) {
        return call(HttpMethod.GET, token, url, null, vars);
    }

    public Response postAs(String token, String url, String json) {
        return call(HttpMethod.POST, token, url, json);
    }

    public Response putAs(String token, String url, String json) {
        return call(HttpMethod.PUT, token, url, json);
    }

    public Response patchAs(String token, String url, String json) {
        return call(HttpMethod.PATCH, token, url, json);
    }

    public Response deleteAs(String token, String url) {
        return call(HttpMethod.DELETE, token, url, null);
    }
}