package com.project.eng_back.Interceptor;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
@Slf4j
public class HttpInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        LOGGER.info("preHandle: {}", request.getRequestURI());
        try {
            HttpSession session = request.getSession();
            // 세션에서 사용자 번호 가져오기 (세션이 없으면 null 반환)
            Integer userNo = (Integer) session.getAttribute("userNo");
            System.out.println("session: " + session);
            System.out.println("userNum: " + userNo);
            // 로그인 상태 확인
            if (userNo != null) {
                // 사용자가 로그인한 경우
                return true;
            } else {
                // 사용자가 로그인하지 않은 경우, 클라이언트에게 로그인 페이지로 이동하라고 알려줌
                response.setHeader("Location", "http://localhost:3000/login");
                response.setStatus(302); // Found (리다이렉션)
                response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                response.setHeader("Access-Control-Allow-Credentials", "true");
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request , HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

}
