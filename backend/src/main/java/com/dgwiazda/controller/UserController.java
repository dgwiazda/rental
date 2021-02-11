package com.dgwiazda.controller;

import com.dgwiazda.dto.UserOrdersDTO;
import com.dgwiazda.model.Order;
import com.dgwiazda.model.User;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import com.dgwiazda.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController{

    Comparator<UserOrdersDTO> compareByProduct = (UserOrdersDTO o1, UserOrdersDTO o2) ->
            o1.getProduct().compareTo(o2.getProduct());

    OrderRepository orderRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    PasswordEncoder encoder;
    AuthenticationManager authenticationManager;
    JwtUtils jwtUtils;

    @Autowired
    public UserController(OrderRepository orderRepository, ProductRepository productRepository, UserRepository userRepository,
                          PasswordEncoder encoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/orders")
    public List<UserOrdersDTO> getUserOrders(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.getUserOrdersbyUserId(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        return orders;
    }

    @GetMapping("/orders/sort-closest")
    public List<UserOrdersDTO> sortUserOrdersByDateFromAsc(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.sortUserOrdersbyRentDateFromAsc(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        return orders;
    }

    @GetMapping("/orders/sort-farest")
    public List<UserOrdersDTO> sortUserOrdersByDateFromDesc(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.sortUserOrdersbyRentDateFromDesc(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        return orders;
    }

    @GetMapping("/orders/sort-cheapest")
    public List<UserOrdersDTO> sortUserOrdersByPriceAsc(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.sortUserOrdersbyPriceAsc(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        return orders;
    }

    @GetMapping("/orders/sort-expensive")
    public List<UserOrdersDTO> sortUserOrdersByPriceDesc(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.sortUserOrdersbyPriceDesc(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        return orders;
    }

    @GetMapping("/orders/sort-product")
    public List<UserOrdersDTO> sortUserOrdersByProductAsc(Long userId) {
        List<UserOrdersDTO> orders = new ArrayList<>();
        long i = 1;
        for (Order o : orderRepository.getUserOrdersbyUserId(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setUserOrderId(i);
            orderDTO.setId(o.getId());
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getProductType().name());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateTo());
            orders.add(orderDTO);
            i++;
        }
        Collections.sort(orders, compareByProduct);
        return orders;
    }

    @DeleteMapping("/orders/cancel")
    public ResponseEntity<?> deleteOrder(Long index) {
        orderRepository.deleteById(index);
        return ResponseEntity.ok(new MessageResponse("Rezerwacja odwołana."));
    }

    @PutMapping("/change-username")
    public ResponseEntity<?> changeUsername(@RequestParam Long userId, @RequestParam String username) {
        if (userRepository.existsByUsername(username)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Błąd: Nazwa użytkownika już w użyciu!"));
        }

        User user = userRepository.getOne(userId);
        user.setUsername(username);
        userRepository.save(user);

//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username, user.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtUtils.generateJwtToken(authentication);
//
//        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(item -> item.getAuthority())
//                .collect(Collectors.toList());
//        new JwtResponse(
//                jwt,
//                userDetails.getId(),
//                userDetails.getUsername(),
//                userDetails.getEmail(),
//                roles);
        return ResponseEntity.ok(new MessageResponse("Nazwa zmieniona pomyślnie na " + username + "!"));
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestParam Long userId, @RequestParam String oldPassword, @RequestParam String newPassword) {
        if(!encoder.matches(oldPassword, userRepository.getOne(userId).getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Błąd: Stare hasło nie jest prawidłowe!"));
        }
        else {
            User user = userRepository.getOne(userId);
            user.setPassword(encoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok(new MessageResponse("Hasło zmienione pomyślnie!"));
        }

    }

    @PutMapping("/change-email")
    public ResponseEntity<?> changeEmail(@RequestParam Long userId, @RequestParam String email) {
        if (userRepository.existsByEmail(email)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Błąd: Email już w użyciu!"));
        }

        User user = userRepository.getOne(userId);
        user.setEmail(email);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Email pomyślnie zmieniony!"));
    }
}
