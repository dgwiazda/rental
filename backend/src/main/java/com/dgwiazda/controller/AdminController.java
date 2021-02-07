package com.dgwiazda.controller;

import com.dgwiazda.dto.GetUsersDTO;
import com.dgwiazda.dto.OrderDTO;
import com.dgwiazda.dto.ProductDTO;
import com.dgwiazda.model.Order;
import com.dgwiazda.model.Product;
import com.dgwiazda.model.User;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.CategoryRepository;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

	UserRepository userRepository;
	OrderRepository orderRepository;
	ProductRepository productRepository;

	@Autowired
	public AdminController(UserRepository userRepository, OrderRepository orderRepository, ProductRepository productRepository) {
		this.userRepository = userRepository;
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
	}

	@GetMapping("/orders")
	public List<OrderDTO> getOrders() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.findAll()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
				 ) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}

	@GetMapping("/orders/sort-closest")
	public List<OrderDTO> sortOrdersClosest() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.sortByRentDateFromAsc()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
			) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}

	@GetMapping("/orders/sort-farest")
	public List<OrderDTO> sortOrdersFarest() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.findByOrderByRentDateFromDesc()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
			) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}

	@GetMapping("/orders/sort-expensive")
	public List<OrderDTO> sortOrdersExpensive() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.findByOrderByPriceDesc()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
			) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}

	@GetMapping("/orders/sort-cheapest")
	public List<OrderDTO> sortOrdersCheapest() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.findByOrderByPriceAsc()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
			) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}

	@GetMapping("/orders/sort-user")
	public List<OrderDTO> sortOrdersUser() {
		List<OrderDTO> orders = new ArrayList<>();
		for (Order o: orderRepository.findByOrderByUserIdAsc()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(o.getId());
			orderDTO.setPrice(o.getPrice());
			orderDTO.setQuantity((long)o.getProducts().size());
			orderDTO.setRentDateFrom(o.getRentDateFrom());
			orderDTO.setRentDateTo(o.getRentDateTo());
			orderDTO.setUser(o.getUserId().getUsername());
			long productId = 0;
			for (Product p: o.getProducts()
			) {
				productId = p.getId();
			}
			orderDTO.setProductName(productRepository.findById(o.getProducts().stream().findFirst().get().getId()).get().getDescription());
			orderDTO.setProductId(productId - orderDTO.getQuantity() + 1);
			orders.add(orderDTO);
		}
		return orders;
	}



	@GetMapping("/products")
	List<ProductDTO> getProducts() {
		List products = new ArrayList();
		for (Product p : productRepository.findAll() ){
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setAvailiable(p.isAvailiable());
			productDTO.setCategory(p.getCategory().getCategory().name());
			productDTO.setDescription(p.getDescription());
			productDTO.setPrice(p.getPrice());
			products.add(productDTO);
		}
		return products;
	}

	@GetMapping("/products/sort-expensive")
	List<Product> sortProductsExpensive() {
		List products = new ArrayList();
		for (Product p : productRepository.findByOrderByPriceDesc() ){
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setAvailiable(p.isAvailiable());
			productDTO.setCategory(p.getCategory().getCategory().name());
			productDTO.setDescription(p.getDescription());
			productDTO.setPrice(p.getPrice());
			products.add(productDTO);
		}
		return products;
	}

	@GetMapping("/products/sort-cheapest")
	List<Product> sortProductsCheapest() {
		List products = new ArrayList();
		for (Product p : productRepository.findByOrderByPriceAsc() ){
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setAvailiable(p.isAvailiable());
			productDTO.setCategory(p.getCategory().getCategory().name());
			productDTO.setDescription(p.getDescription());
			productDTO.setPrice(p.getPrice());
			products.add(productDTO);
		}
		return products;
	}

	@GetMapping("/products/sort-id-asc")
	List<Product> sortProductsIdAsc() {
		List products = new ArrayList();
		for (Product p : productRepository.findByOrderByIdAsc() ){
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setAvailiable(p.isAvailiable());
			productDTO.setCategory(p.getCategory().getCategory().name());
			productDTO.setDescription(p.getDescription());
			productDTO.setPrice(p.getPrice());
			products.add(productDTO);
		}
		return products;
	}

	@GetMapping("/products/sort-id-desc")
	List<Product> sortProductsIdDesc() {
		List products = new ArrayList();
		for (Product p : productRepository.findByOrderByIdDesc() ){
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setAvailiable(p.isAvailiable());
			productDTO.setCategory(p.getCategory().getCategory().name());
			productDTO.setDescription(p.getDescription());
			productDTO.setPrice(p.getPrice());
			products.add(productDTO);
		}
		return products;
	}

	@PutMapping("/products/availiable")
	public ResponseEntity<?> changeAvailiable(Long itemIndex) {
		Product product = productRepository.getOne(itemIndex);
		if(product.isAvailiable()) {
			product.setAvailiable(false);
		}
		else {
			product.setAvailiable(true);
		}
		productRepository.save(product);
		return ResponseEntity.ok(new MessageResponse("Status dostepnosci zmieniony."));
	}

	@GetMapping("/users")
	List<GetUsersDTO> getUsers() {
		List<GetUsersDTO> users = new ArrayList<>();
		for (User u : userRepository.findAll()) {
			GetUsersDTO userDTO = new GetUsersDTO();
			userDTO.setId(u.getId());
			userDTO.setEmail(u.getEmail());
			userDTO.setUsername(u.getUsername());
			userDTO.setOrdersCount(orderRepository.getOrderCount(u.getId()));
			users.add(userDTO);
		}
		return users;
	}

	@GetMapping("/users/sort-username-asc")
	List<GetUsersDTO> sortUsersUsernameAsc() {
		List<GetUsersDTO> users = new ArrayList<>();
		for (User u : userRepository.findByOrderByUsernameAsc()) {
			GetUsersDTO userDTO = new GetUsersDTO();
			userDTO.setId(u.getId());
			userDTO.setEmail(u.getEmail());
			userDTO.setUsername(u.getUsername());
			userDTO.setOrdersCount(orderRepository.getOrderCount(u.getId()));
			users.add(userDTO);
		}
		return users;
	}

	@GetMapping("/users/sort-username-desc")
	List<GetUsersDTO> sortUsersUsernameDesc() {
		List<GetUsersDTO> users = new ArrayList<>();
		for (User u : userRepository.findByOrderByUsernameDesc()) {
			GetUsersDTO userDTO = new GetUsersDTO();
			userDTO.setId(u.getId());
			userDTO.setEmail(u.getEmail());
			userDTO.setUsername(u.getUsername());
			userDTO.setOrdersCount(orderRepository.getOrderCount(u.getId()));
			users.add(userDTO);
		}
		return users;
	}

	@GetMapping("/users/sort-email-asc")
	List<GetUsersDTO> sortUsersEmailAsc() {
		List<GetUsersDTO> users = new ArrayList<>();
		for (User u : userRepository.findByOrderByEmailAsc()) {
			GetUsersDTO userDTO = new GetUsersDTO();
			userDTO.setId(u.getId());
			userDTO.setEmail(u.getEmail());
			userDTO.setUsername(u.getUsername());
			userDTO.setOrdersCount(orderRepository.getOrderCount(u.getId()));
			users.add(userDTO);
		}
		return users;
	}

	@GetMapping("/users/sort-email-desc")
	List<GetUsersDTO> sortUsersEmailDesc() {
		List<GetUsersDTO> users = new ArrayList<>();
		for (User u : userRepository.findByOrderByEmailDesc()) {
			GetUsersDTO userDTO = new GetUsersDTO();
			userDTO.setId(u.getId());
			userDTO.setEmail(u.getEmail());
			userDTO.setUsername(u.getUsername());
			userDTO.setOrdersCount(orderRepository.getOrderCount(u.getId()));
			users.add(userDTO);
		}
		return users;
	}



	@GetMapping("/sales/monthly")
	List<Float> getMonthlySale() {
		return orderRepository.getMonthlySale();
	}

	@GetMapping("/sales/annually")
	List<Float> getAnnuallySale() {
		return orderRepository.getAnnuallySale();
	}

}
