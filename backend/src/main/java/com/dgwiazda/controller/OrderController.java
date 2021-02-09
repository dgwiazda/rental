package com.dgwiazda.controller;

import com.dgwiazda.dto.AddOrderDTO;
import com.dgwiazda.model.Order;
import com.dgwiazda.payload.response.MessageResponse;
import com.dgwiazda.repository.OrderRepository;
import com.dgwiazda.repository.ProductRepository;
import com.dgwiazda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody AddOrderDTO orderDTO) {
        Order order = new Order();
        order.setRentDateFrom(orderDTO.getRentDateFrom());
        order.setRentDateTo(orderDTO.getRentDateTo());
        order.setPrice(orderDTO.getPrice());
        order.setUserId(userRepository.findById(orderDTO.getUserId()).get());

        Set productsOrder = new HashSet();
        List disabledProductsId = orderDTO.getDisabledProducts();
        long quantity = orderDTO.getQuantity();
        long productTypeId = orderDTO.getProductId();
        long productsCount = orderDTO.getProductsCount();
        long productId;
        for (long i =0; i < productsCount; i++) {
            productId = productTypeId + i;
            if (!disabledProductsId.contains(productId)) {
                productsOrder.add(productRepository.getOne(productId));
                quantity--;
            }
            if (quantity == 0) {
                i = productsCount + 1;
            }
        }
        order.setProducts(productsOrder);
        orderRepository.save(order);

        return ResponseEntity.ok(new MessageResponse("Rezerwacja dokonana."));
    }

    @GetMapping("/bieznia/unavailiable")
    public List<Long> getBiezniaIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableBiezniaId());
        return products;
    }
    @GetMapping("/bieznia/options-to-disable")
    public Set<Long> getBiezniaIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getBiezniaIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getBiezniaIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getBiezniaIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/kajak/unavailiable")
    public List<Long> getKajakIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableKajakId());
        return products;
    }
    @GetMapping("/kajak/options-to-disable")
    public Set<Long> getKajakIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getKajakIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getKajakIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getKajakIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/mata/unavailiable")
    public List<Long> getMataIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableMataId());
        return products;
    }
    @GetMapping("/mata/options-to-disable")
    public Set<Long> getMataIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getMataIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getMataIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getMataIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/rower-kolazowka/unavailiable")
    public List<Long> getRowerKolazowkaIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableRowerKolazowkaId());
        return products;
    }
    @GetMapping("/rower-kolazowka/options-to-disable")
    public Set<Long> getRowerKolazowkaIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getRowerKolazowkaIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getRowerKolazowkaIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getRowerKolazowkaIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/rower-gorski/unavailiable")
    public List<Long> getRowerGorskiIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableRowerGorskiId());
        return products;
    }
    @GetMapping("/rower-gorski/options-to-disable")
    public Set<Long> getRowerGorskiIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getRowerGorskiIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getRowerGorskiIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getRowerGorskiIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/rower-miejski/unavailiable")
    public List<Long> getRowerMiejskiIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableRowerMiejskiId());
        return products;
    }
    @GetMapping("/rower-miejski/options-to-disable")
    public Set<Long> getRowerMiejskiIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getRowerMiejskiIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getRowerMiejskiIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getRowerMiejskiIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/rower-stacjonarny/unavailiable")
    public List<Long> getRowerStacjonarnyIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableRowerStacjonarnyId());
        return products;
    }
    @GetMapping("/rower-stacjonarny/options-to-disable")
    public Set<Long> getRowerStacjonarnyIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getRowerStacjonarnyIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getRowerStacjonarnyIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getRowerStacjonarnyIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/spadochron/unavailiable")
    public List<Long> getSpadochronIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableSpadochronId());
        return products;
    }
    @GetMapping("/spadochron/options-to-disable")
    public Set<Long> getSpadochronIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getSpadochronIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getSpadochronIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getSpadochronIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/szyna-cmp/unavailiable")
    public List<Long> getSzynaCmpIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableSzynaCmpId());
        return products;
    }
    @GetMapping("/szyna-cmp/options-to-disable")
    public Set<Long> getSzynaCmpIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getSzynaCmpIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getSzynaCmpIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getSzynaCmpIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/worek-treningowy/unavailiable")
    public List<Long> getWorekTreningowyIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableWorekTreningowyId());
        return products;
    }
    @GetMapping("/worek-treningowy/options-to-disable")
    public Set<Long> getWorekTreningowyIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getWorekTreningowyIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getWorekTreningowyIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getWorekTreningowyIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/gruszka/unavailiable")
    public List<Long> getGruszkaIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableGruszkaId());
        return products;
    }
    @GetMapping("/gruszka/options-to-disable")
    public Set<Long> getGruszkaIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getGruszkaIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getGruszkaIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getGruszkaIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/zestaw-do-nart/unavailiable")
    public List<Long> getZestawDoNartIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableZestawDoNartId());
        return products;
    }
    @GetMapping("/zestaw-do-nart/options-to-disable")
    public Set<Long> getZestawDoNartIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getZestawDoNartIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getZestawDoNartIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getZestawDoNartIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/zestaw-do-hokeja/unavailiable")
    public List<Long> getZestawDoHokejaIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableZestawDoHokejaId());
        return products;
    }
    @GetMapping("/zestaw-do-hokeja/options-to-disable")
    public Set<Long> getZestawDoHokejaIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getZestawDoHokejaIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getZestawDoHokejaIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getZestawDoHokejaIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/zestaw-do-snowboardu/unavailiable")
    public List<Long> getZestawDoSnowboarduIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableZestawDoSnowboarduId());
        return products;
    }
    @GetMapping("/zestaw-do-snowboardu/options-to-disable")
    public Set<Long> getZestawDoSnowboarduIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getZestawDoSnowboarduIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getZestawDoSnowboarduIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getZestawDoSnowboarduIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }

    @GetMapping("/zestaw-do-wspinaczki/unavailiable")
    public List<Long> getZestawDoWspinaczkiIdUnavailiable() {
        List<Long> products = new ArrayList<>();
        products.addAll(orderRepository.getUnavailiableZestawDoWspinaczkiId());
        return products;
    }
    @GetMapping("/zestaw-do-wspinaczki/options-to-disable")
    public Set<Long> getZestawDoWspinaczkiIdDisable(@RequestParam String rentDateFrom, @RequestParam String rentDateTo) {
        List<Long> list = new ArrayList<>();
        List<Long> list1 = orderRepository.getZestawDoWspinaczkiIdToDisableLeft(rentDateFrom, rentDateTo);
        List<Long> list2 = orderRepository.getZestawDoWspinaczkiIdToDisableRight(rentDateFrom, rentDateTo);
        List<Long> list3 = orderRepository.getZestawDoWspinaczkiIdToDisableInside(rentDateFrom, rentDateTo);
        if (list1 != null) {
            list.addAll(list1);
        }
        if (list2 != null) {
            list.addAll(list2);
        }
        if (list3 != null) {
            list.addAll(list3);
        }
        Set<Long> products = new HashSet<>(list);
        return products;
    }
}
