package com.project.eng_back.Middleware;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class ConversationMiddleware implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(ConversationMiddleware.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 대화 시작 로그
        logger.info("Conversation Started");

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 대화 종료 후 로그
        logger.info("Conversation Ended");
    }
}
