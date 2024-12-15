import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

interface CategoryResponseType {
  id: string;
  name: string;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  salePrice: number;
  quantity: number;
  image: string | null;
  slug: string;
  ratings: number;
  productStatus: string;
  category: string;
  modifiedDate: string;
  modifiedBy: string;
}

const AddProduct = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      salePrice: 0,
      quantity: 0,
      image: null,
      slug: "",
      ratings: 0,
      productStatus: "",
      category: "",
      modifiedDate: new Date().toISOString(),
      modifiedBy: "Admin", // Replace with dynamic user if needed
    },
  });

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        Alert.alert("Image picker canceled");
      } else if (response.errorMessage) {
        Alert.alert("Error picking image:", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setValue("image", uri);
          Alert.alert("Image selected!");
        }
      }
    });
  };

  const onSubmit = async (data: ProductFormValues) => {
    const apiUrl = "https://your-backend-url/api/products"; // Replace with your actual endpoint
    try {
      const response = await axios.post(apiUrl, data);
      if (response.status === 201) {
        Alert.alert("Success", "Product added successfully!");
      } else {
        Alert.alert("Error", "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Product name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter product name"
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        rules={{ required: "Description is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter product description"
            multiline
          />
        )}
      />
      {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

      <Text style={styles.label}>Price</Text>
      <Controller
        control={control}
        name="price"
        rules={{ required: "Price is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value.toString()}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            placeholder="Enter price"
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Text style={styles.label}>Sale Price</Text>
      <Controller
        control={control}
        name="salePrice"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value.toString()}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            placeholder="Enter sale price"
            keyboardType="numeric"
          />
        )}
      />

      <Text style={styles.label}>Quantity</Text>
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value.toString()}
            onChangeText={(text) => onChange(parseInt(text) || 0)}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />
        )}
      />

      <Text style={styles.label}>Slug</Text>
      <Controller
        control={control}
        name="slug"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter product slug"
          />
        )}
      />

      <Text style={styles.label}>Ratings</Text>
      <Controller
        control={control}
        name="ratings"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value.toString()}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            placeholder="Enter ratings"
            keyboardType="numeric"
          />
        )}
      />

      <Text style={styles.label}>Product Status</Text>
      <Controller
        control={control}
        name="productStatus"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter product status"
          />
        )}
      />

      <Text style={styles.label}>Category</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Enter category"
          />
        )}
      />

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.uploadButton}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.saveButtonText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  uploadButton: {
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#FF6F61",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default AddProduct;
