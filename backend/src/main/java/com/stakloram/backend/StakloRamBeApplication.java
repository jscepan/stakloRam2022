package com.stakloram.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StakloRamBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(StakloRamBeApplication.class, args);
    }
//                      - racunanje gradj. mere. Cak i kad je deljivo sa 3 i onda se podize
//                      - Umesto za osobu napisati "Za potrebe" na kreiraj radni nalog
//                      - smanjiti jedinica mere na kreiranje/izmena fakture, kao i sve drugo...
//                      - Fiksirati zaglavlje kod scroll-a
//                      - QR code gurnuti u header desno od naziva firme
//                      - Websajt preduzeca je opcioni
//                      - Firmin email: staklorambp@gmail.com
//        - Nacin placanja gotovina kod gotovinskog racuna
//        - Na create-invoice staviti desno od kupca opciju za oslobodjeno PDV-a i u slucaju da se klikne, tada se podesi da je PDV stopa 0% i doda
//        se u napomenu tekst: OSLOBOĐENO PLAĆANJA PDV-a PO ČLANU 10, STAV 2, TAČKA 3, ZAKONA O PDV-u.
//                
                
    // Remove comments if is develop mode to remove CORS errors...
//    /*
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedHeaders("*")
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }
        };
    }
//     */
}
