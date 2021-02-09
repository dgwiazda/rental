package com.dgwiazda;

import com.dgwiazda.dto.OrderDTO;
import com.dgwiazda.enums.ECategory;
import com.dgwiazda.enums.EProductType;
import com.dgwiazda.enums.ERole;
import com.dgwiazda.model.*;
import com.dgwiazda.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;

@SpringBootApplication
@Configuration
public class Wypozyczalnia {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
    CategoryRepository categoryRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	OrderRepository orderRepository;

	public static void main(String[] args) {
		SpringApplication.run(Wypozyczalnia.class, args);
	}

	public PasswordEncoder passwordEncoderStart() {
		return new BCryptPasswordEncoder();
	}

	@PostConstruct
	public void runAtStart() {

		roleRepository.save(new Role(ERole.ROLE_USER));
		roleRepository.save(new Role(ERole.ROLE_ADMIN));

		Set<Role> userRoles = new HashSet<>();
		Set<Role> adminRoles = new HashSet<>();

		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		userRoles.add(userRole);
		adminRoles.add(userRole);
		Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		adminRoles.add(adminRole);

		Category category1 = new Category(1L, ECategory.SPORTY_ZIOMOWE);
		Category category2 = new Category(2L, ECategory.SZTUKI_WALKI);
		Category category3 = new Category(3L, ECategory.REHABILITACJA);
		Category category4 = new Category(4L, ECategory.BOISKA_HALE);
		Category category5 = new Category(5L, ECategory.INNE);
		categoryRepository.save(category1);
		categoryRepository.save(category2);
		categoryRepository.save(category3);
		categoryRepository.save(category4);
		categoryRepository.save(category5);

		Product bieznia1 = new Product(1L, 20F, true, "bieżnia", EProductType.BIEZNIA, category3);
		Product bieznia2 = new Product(2L, 20F, true, "bieżnia", EProductType.BIEZNIA, category3);
		Product hala1 = new Product(3L, 100F, true, "hala ul. Wyspiańskiego 36", EProductType.HALA, category4);
		Product hala2 = new Product(4L, 100F, true, "hala ul. Sochaczewska 14", EProductType.HALA, category4);
		Product kajak1 = new Product(5L, 100F, true, "kajak", EProductType.KAJAK, category5);
		Product kajak2 = new Product(6L, 100F, true, "kajak", EProductType.KAJAK, category5);
		Product kajak3 = new Product(7L, 100F, true, "kajak", EProductType.KAJAK, category5);
		Product mata1 = new Product(8L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata2 = new Product(9L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata3 = new Product(10L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata4 = new Product(11L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata5 = new Product(12L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata6 = new Product(13L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata7 = new Product(14L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata8 = new Product(15L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata9 = new Product(16L, 5F, true, "mata", EProductType.MATA, category2);
		Product mata10 = new Product(17L, 5F, true, "mata", EProductType.MATA, category2);
		Product orlik1 = new Product(18L, 100F, true, "orlik ul. Warszawska 36", EProductType.ORLIK, category4);
		Product orlik2 = new Product(19L, 100F, true, "orlik ul. 3-maja 14", EProductType.ORLIK, category4);
		Product orlik3 = new Product(20L, 100F, true, "orlik ul. Żwirki i Wigury 3", EProductType.ORLIK, category4);
		Product rower1 = new Product(21L, 20F, true, "kolażówka", EProductType.ROWER_KOLAZOWKA, category5);
		Product rower2 = new Product(22L, 20F, true, "kolażówka", EProductType.ROWER_KOLAZOWKA, category5);
		Product rower3 = new Product(23L, 20F, true, "górski", EProductType.ROWER_GORSKI, category5);
		Product rower4 = new Product(24L, 20F, true, "górski", EProductType.ROWER_GORSKI, category5);
		Product rower5 = new Product(25L, 20F, true, "miejski", EProductType.ROWER_MIEJSKI, category5);
		Product rower6 = new Product(26L, 20F, true, "miejski", EProductType.ROWER_MIEJSKI, category5);
		Product rowerStacjonarny1 = new Product(27L, 20F, true, "rower stacjonarny", EProductType.ROWER_STACJONARNY, category3);
		Product rowerStacjonarny2 = new Product(28L, 20F, true, "rower stacjonarny", EProductType.ROWER_STACJONARNY, category3);
		Product spadochron1 = new Product(29L, 200F, true, "spadochron", EProductType.SPADOCHRON, category5);
		Product stadion1 = new Product(30L, 100F, true, "stadion ul. Brochowska 54", EProductType.STADION, category4);
		Product szynaCmp1 = new Product(31L, 35F, true, "Szyna CMP", EProductType.SZYNA_CMP, category3);
		Product worekTreningowy1 = new Product(32L, 30F, true, "worek treningowy", EProductType.WOREK_TRENINGOWY, category2);
		Product worekTreningowy2 = new Product(33L, 30F, true, "worek treningowy", EProductType.WOREK_TRENINGOWY, category2);
		Product worekTreningowy3 = new Product(34L, 20F, true, "gruszka", EProductType.GRUSZKA, category2);
		Product worekTreningowy4 = new Product(35L, 20F, true, "gruszka", EProductType.GRUSZKA, category2);
		Product zestawDoNart1 = new Product(36L, 100F, true, "zestaw do nart", EProductType.ZESTAW_DO_NART, category1);
		Product zestawDoNart2 = new Product(37L, 100F, true, "zestaw do nart", EProductType.ZESTAW_DO_NART, category1);
		Product zestawDoNart3 = new Product(38L, 100F, true, "zestaw do nart", EProductType.ZESTAW_DO_NART, category1);
		Product zestawDoHokeja1 = new Product(39L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja2 = new Product(40L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja3 = new Product(41L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja4 = new Product(42L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja5 = new Product(43L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja6 = new Product(44L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja7 = new Product(45L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoHokeja8 = new Product(46L, 60F, true, "zestaw do hokeja", EProductType.ZESTAW_DO_HOKEJA, category1);
		Product zestawDoSnowboardu1 = new Product(47L, 100F, true, "zestaw do snowboardu", EProductType.ZESTAW_DO_SNOWBOARDU, category1);
		Product zestawDoSnowboardu2 = new Product(48L, 100F, true, "zestaw do snowboardu", EProductType.ZESTAW_DO_SNOWBOARDU, category1);
		Product zestawDoSnowboardu3 = new Product(49L, 100F, true, "zestaw do snowboardu", EProductType.ZESTAW_DO_SNOWBOARDU, category1);
		Product zestawWspinaczkowy1 = new Product(50L, 40F, true, "zestaw do wspinaczki", EProductType.ZESTAW_DO_SNOWBOARDU, category5);
		Product zestawWspinaczkowy2 = new Product(51L, 40F, true, "zestaw do wspinaczki", EProductType.ZESTAW_DO_SNOWBOARDU, category5);

		productRepository.save(bieznia1);
		productRepository.save(bieznia2);
		productRepository.save(hala1);
		productRepository.save(hala2);
		productRepository.save(kajak1);
		productRepository.save(kajak2);
		productRepository.save(kajak3);
		productRepository.save(mata1);
		productRepository.save(mata2);
		productRepository.save(mata3);
		productRepository.save(mata4);
		productRepository.save(mata5);
		productRepository.save(mata6);
		productRepository.save(mata7);
		productRepository.save(mata8);
		productRepository.save(mata9);
		productRepository.save(mata10);
		productRepository.save(orlik1);
		productRepository.save(orlik2);
		productRepository.save(orlik3);
		productRepository.save(rower1);
		productRepository.save(rower2);
		productRepository.save(rower3);
		productRepository.save(rower4);
		productRepository.save(rower5);
		productRepository.save(rower6);
		productRepository.save(rowerStacjonarny1);
		productRepository.save(rowerStacjonarny2);
		productRepository.save(spadochron1);
		productRepository.save(stadion1);
		productRepository.save(szynaCmp1);
		productRepository.save(worekTreningowy1);
		productRepository.save(worekTreningowy2);
		productRepository.save(worekTreningowy3);
		productRepository.save(worekTreningowy4);
		productRepository.save(zestawDoNart1);
		productRepository.save(zestawDoNart2);
		productRepository.save(zestawDoNart3);
		productRepository.save(zestawDoHokeja1);
		productRepository.save(zestawDoHokeja2);
		productRepository.save(zestawDoHokeja3);
		productRepository.save(zestawDoHokeja4);
		productRepository.save(zestawDoHokeja5);
		productRepository.save(zestawDoHokeja6);
		productRepository.save(zestawDoHokeja7);
		productRepository.save(zestawDoHokeja8);
		productRepository.save(zestawDoSnowboardu1);
		productRepository.save(zestawDoSnowboardu2);
		productRepository.save(zestawDoSnowboardu3);
		productRepository.save(zestawWspinaczkowy1);
		productRepository.save(zestawWspinaczkowy2);

		User admin = new User(
				"admin",
				"admin@admin.com",
				passwordEncoderStart().encode("admin"),
				adminRoles);

		userRepository.save(admin);

		Order order1 = new Order(1L,
				LocalDateTime.of(2021, 2, 22, 0, 1),
				LocalDateTime.of(2021, 2, 25, 23, 59),
				100F,
				admin);//bieznia1
		Order order2 = new Order(2L,
				LocalDateTime.of(2021, 1, 2, 0, 1),
				LocalDateTime.of(2021, 1, 3, 23, 59),
				600F,
				admin);//zestawDoNart1
		Order order3 = new Order(3L,
				LocalDateTime.of(2021, 2, 15, 0, 1),
				LocalDateTime.of(2021, 2, 15, 23, 59),
				20F,
				admin);//mata1
		Order order4 = new Order(4L,
				LocalDateTime.of(2021, 1, 20, 10, 0),
				LocalDateTime.of(2021, 1, 20, 12, 0),
				100F,
				admin);//hala1
		Order order5 = new Order(5L,
				LocalDateTime.of(2021, 2, 20, 0, 1),
				LocalDateTime.of(2021, 2, 27, 23, 59),
				560F,
				admin);//zestawWspinaczkowy1

		Set productsOrder1 = new HashSet();
		Set productsOrder2 = new HashSet();
		Set productsOrder3 = new HashSet();
		Set productsOrder4 = new HashSet();
		Set productsOrder5 = new HashSet();

		productsOrder1.add(bieznia1);
		order1.setProducts(productsOrder1);

		productsOrder2.add(zestawDoNart1);
		productsOrder2.add(zestawDoNart2);
		productsOrder2.add(zestawDoNart3);
		order2.setProducts(productsOrder2);

		productsOrder3.add(mata1);
		productsOrder3.add(mata2);
		productsOrder3.add(mata3);
		productsOrder3.add(mata4);
		order3.setProducts(productsOrder3);

		productsOrder4.add(hala1);
		order4.setProducts(productsOrder4);

		productsOrder5.add(zestawWspinaczkowy1);
		productsOrder5.add(zestawWspinaczkowy2);
		order5.setProducts(productsOrder5);

		orderRepository.save(order1);
		orderRepository.save(order2);
		orderRepository.save(order3);
		orderRepository.save(order4);
		orderRepository.save(order5);
	}
}
