package com.dgwiazda.controller;

import com.dgwiazda.dto.UserOrdersDTO;
import com.dgwiazda.enums.ERole;
import com.dgwiazda.model.Order;
import com.dgwiazda.model.Role;
import com.dgwiazda.model.User;
import com.dgwiazda.payload.response.JwtResponse;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import com.dgwiazda.security.jwt.JwtUtils;
import com.dgwiazda.security.services.UserDetailsImpl;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

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
        System.out.println(userId);
        long i = 1;
        System.out.println(orderRepository.getUserOrdersbyUserId(userId));
        for (Order o : orderRepository.getUserOrdersbyUserId(userId)) {
            UserOrdersDTO orderDTO = new UserOrdersDTO();
            orderDTO.setId(i);
            orderDTO.setPrice(o.getPrice());
            orderDTO.setProduct(productRepository.findById(orderRepository.getProducIdByOrderId(o.getId())).get().getDescription());
            orderDTO.setQuantity(orderRepository.getQuantityBy(o.getId()));
            orderDTO.setRentDateFrom(o.getRentDateFrom());
            orderDTO.setRentDateTo(o.getRentDateFrom());
            orders.add(orderDTO);
            i++;
        }
        System.out.println(orders);
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
