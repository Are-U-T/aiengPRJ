package com.project.eng_back.Config;

import com.project.eng_back.Interceptor.HttpInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//   @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//            .allowedOrigins("http://localhost:3000", "http://localhost:80")
//            .allowedMethods("GET", "POST", "PUT", "DELETE")
//            .allowCredentials(true)
//            .maxAge(3600);
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:80")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")  // 필요에 따라 노출할 헤더 추가
                .allowCredentials(true)
                .maxAge(3600);
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(new HttpInterceptor()).excludePathPatterns("/user/login"); // Interceptor 적용 대상이 아님 만약 .exclud ~ 말고 add.PathPatterns("/**"); 를 쓰면
//        // Interceptor 적용 대상임
//    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new HttpInterceptor())
//                .excludePathPatterns("/main", "/developer", "/login", "/signup", "/user/**", "/error");
//    }


//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new HttpInterceptor())
//                .excludePathPatterns("/**") // 모든 경로에서 인터셉터 제외
//                .addPathPatterns("/speech"); // 원하는 프론트엔드 경로에만 인터셉터 적용
//    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        InterceptorRegistration registration = registry.addInterceptor(new HttpInterceptor());
//        registration.addPathPatterns("/speech", "/mypage");
//    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(new HttpInterceptor())
//                .addPathPatterns("/speaking", "/mypage", "/speech") // 해당 인터셉터가 동작할 경로 설정
//                .excludePathPatterns("/main"); // 설정된 경로는 인터셉터 예외 설정
//    }
}