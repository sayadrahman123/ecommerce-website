package com.rahmani.backend.config;

import com.rahmani.backend.model.Product;
import com.rahmani.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {

            // Common lists for simplicity
            List<String> commonSizes = Arrays.asList("Small", "Medium", "Large", "X-Large");
            List<String> commonColors = Arrays.asList("Red", "Blue", "Black");

            Product[] products = {
                    // NEW ARRIVALS
                    new Product(null, "T-shirt with Tape Details", "A stylish t-shirt with unique tape details.", new BigDecimal("120.00"), 4.5, "t-shirts", "https://placehold.co/600x600/png?text=T-Shirt+Tape", commonColors, commonSizes),
                    new Product(null, "Skinny Fit Jeans", "Comfortable skinny fit jeans for everyday wear.", new BigDecimal("240.00"), 3.5, "jeans", "https://placehold.co/600x600/png?text=Skinny+Jeans", Arrays.asList("Blue", "Black"), Arrays.asList("30", "32", "34")),
                    new Product(null, "Checkered Shirt", "Classic checkered shirt pattern.", new BigDecimal("180.00"), 4.5, "shirts", "https://placehold.co/600x600/png?text=Checkered+Shirt", Arrays.asList("Red-Check", "Blue-Check"), commonSizes),
                    new Product(null, "Sleeve Striped T-shirt", "Trendy sleeve striped t-shirt.", new BigDecimal("130.00"), 4.5, "t-shirts", "https://placehold.co/600x600/png?text=Striped+T-Shirt", commonColors, commonSizes),

                    // TOP SELLING
                    new Product(null, "Vertical Striped Shirt", "Elegant vertical striped shirt.", new BigDecimal("212.00"), 5.0, "shirts", "https://placehold.co/600x600/png?text=Vertical+Striped", Arrays.asList("Green", "White"), commonSizes),
                    new Product(null, "Courage Graphic T-shirt", "Bold graphic t-shirt with courage print.", new BigDecimal("145.00"), 4.0, "t-shirts", "https://placehold.co/600x600/png?text=Courage+Graphic", commonColors, commonSizes),
                    new Product(null, "Loose Fit Bermuda Shorts", "Relaxed loose fit bermuda shorts.", new BigDecimal("80.00"), 3.0, "shorts", "https://placehold.co/600x600/png?text=Bermuda+Shorts", Arrays.asList("Blue"), Arrays.asList("M", "L", "XL")),
                    new Product(null, "Faded Skinny Jeans", "Vintage style faded skinny jeans.", new BigDecimal("210.00"), 4.5, "jeans", "https://placehold.co/600x600/png?text=Faded+Jeans", Arrays.asList("Blue", "Grey"), Arrays.asList("30", "32", "34")),

                    // OTHERS
                    new Product(null, "Polo with Contrast Trims", "Classic polo with modern contrast trims.", new BigDecimal("212.00"), 4.0, "shirts", "https://placehold.co/600x600/png?text=Polo+Trims", commonColors, commonSizes),
                    new Product(null, "Gradient Graphic T-shirt", "Colorful gradient graphic tee.", new BigDecimal("145.00"), 3.5, "t-shirts", "https://placehold.co/600x600/png?text=Gradient+Tee", commonColors, commonSizes),
                    new Product(null, "Black Striped T-shirt", "Essential black striped t-shirt.", new BigDecimal("120.00"), 5.0, "t-shirts", "https://placehold.co/600x600/png?text=Black+Striped", Arrays.asList("Black", "White"), commonSizes)
            };

            productRepository.saveAll(Arrays.asList(products));
            System.out.println("___ Database initialized with " + products.length + " products ___");
        }
    }
}