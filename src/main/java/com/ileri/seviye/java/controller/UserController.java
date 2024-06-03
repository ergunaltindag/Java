package com.ileri.seviye.java.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ileri.seviye.java.config.UnauthorizedException;
import com.ileri.seviye.java.dto.UserDto;
import com.ileri.seviye.java.model.User;
import com.ileri.seviye.java.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/add")
	public void addUser(@RequestBody User user) {
		userService.add(user);
	}

	@PostMapping("/shop")
	public void shopUser(Principal principal, @RequestBody User user) {

		if (principal == null || principal.getName() == null || principal.getName().isEmpty()) {
			throw new UnauthorizedException("Please log in first");
		}
		userService.addProduct(principal.getName(), user);
	}

	@PostMapping("/removeshop")
	public void removeShopUser(Principal principal) {

		if (principal == null || principal.getName() == null || principal.getName().isEmpty()) {
			throw new UnauthorizedException("Please log in first");
		}

		userService.removeProduct(principal.getName());
	}

	@DeleteMapping("/delete")
	public void deleteUser(Principal principal) {

		if (principal == null || principal.getName() == null || principal.getName().isEmpty()) {
			throw new UnauthorizedException("Please log in first");
		}
		userService.delete(principal.getName());
	}

	@GetMapping("/dto")
	public UserDto getUserDto(Principal principal) {

		if (principal == null || principal.getName() == null || principal.getName().isEmpty()) {
			throw new UnauthorizedException("Please log in first");
		}

		return modelMapper.map(userService.getUser(principal.getName()), UserDto.class);
	}

	@GetMapping("/product")
	public boolean getProductByUserId(Principal principal) {

		if (principal == null || principal.getName() == null || principal.getName().isEmpty()) {
			throw new UnauthorizedException("Please log in first");
		}

		return userService.getProduct(principal.getName());
	}

	
}
