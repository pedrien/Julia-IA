# Exemples d'utilisation du hook useCustomMutation

## Exemple 1: Mutation simple avec messages par défaut

```typescript
export const useCreateUser = () => {
  return useCustomMutation({
    mutationFn: createUserService,
    messages: {
      success: "Utilisateur créé avec succès",
      error: "Erreur lors de la création de l'utilisateur",
    },
    invalidateQueries: ["users-list"],
  });
};
```

## Exemple 2: Mutation avec actions personnalisées et invalidation dynamique

```typescript
export const useUpdateProduct = () => {
  return useCustomMutation({
    mutationFn: updateProductService,
    messages: {
      success: "Produit mis à jour avec succès",
      error: "Erreur lors de la mise à jour du produit",
    },
    invalidateQueries: [
      "products-list",
      ["product-details", "id"], // Invalidation avec paramètre dynamique
    ],
    onSuccess: async (data, variables) => {
      // Action personnalisée après succès
      await logProductUpdate(variables.id, data);
      // Redirection ou autre logique
      router.push(`/products/${variables.id}`);
    },
    onError: (error, variables) => {
      // Gestion d'erreur personnalisée
      console.error(`Erreur pour le produit ${variables.id}:`, error);
    },
  });
};
```

## Exemple 3: Mutation sans loading automatique

```typescript
export const useDeleteItem = () => {
  return useCustomMutation({
    mutationFn: deleteItemService,
    messages: {
      success: "Élément supprimé avec succès",
      error: "Erreur lors de la suppression",
    },
    invalidateQueries: ["items-list"],
    useLoading: false, // Pas de loading automatique
  });
};
```

## Exemple 4: Mutation avec gestion personnalisée des erreurs de validation

```typescript
export const useCreateOrder = () => {
  return useCustomMutation({
    mutationFn: createOrderService,
    messages: {
      success: "Commande créée avec succès",
      error: "Erreur lors de la création de la commande",
    },
    invalidateQueries: ["orders-list"],
    onValidationError: (errors) => {
      // Gestion personnalisée des erreurs de validation
      Object.entries(errors).forEach(([field, messages]) => {
        if (field === "items" && messages.length > 0) {
          showToast({
            title: "Erreur de validation",
            description: "Veuillez vérifier les articles de la commande",
            color: "warning",
          });
        }
      });
    },
  });
};
```

## Exemple 5: Mutation avec options personnalisées et invalidation complexe

```typescript
export const useBulkOperation = () => {
  return useCustomMutation({
    mutationFn: bulkOperationService,
    messages: {
      success: "Opération en lot terminée avec succès",
      error: "Erreur lors de l'opération en lot",
    },
    invalidateQueries: [
      "items-list",
      ["item-details", "id"], // Invalidation avec paramètre dynamique
      "categories-list",
    ],
    mutationOptions: {
      retry: 3,
      retryDelay: 1000,
      onMutate: (variables) => {
        // Optimistic update
        return { previousData: queryClient.getQueryData(["items-list"]) };
      },
      onError: (error, variables, context) => {
        // Rollback en cas d'erreur
        if (context?.previousData) {
          queryClient.setQueryData(["items-list"], context.previousData);
        }
      },
    },
  });
};
```

## Exemple 6: Invalidation avec plusieurs paramètres dynamiques

```typescript
export const useUpdateOrderItem = () => {
  return useCustomMutation({
    mutationFn: updateOrderItemService,
    messages: {
      success: "Article de commande mis à jour",
      error: "Erreur lors de la mise à jour",
    },
    invalidateQueries: [
      "orders-list",
      ["order-details", "orderId"], // Invalidation avec orderId
      ["order-items", "orderId", "itemId"], // Invalidation avec orderId et itemId
    ],
  });
};
```

## Utilisation dans les composants

```typescript
const MyComponent = () => {
  const { mutate, isPending, error } = useCreateUser();

  const handleSubmit = (userData) => {
    mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... champs du formulaire ... */}
      <button type="submit" disabled={isPending}>
        {isPending ? "Création..." : "Créer l'utilisateur"}
      </button>
    </form>
  );
};
```

## Types TypeScript

Le hook supporte maintenant des types plus stricts :

```typescript
// Types génériques pour vos données
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

// Utilisation avec types
export const useCreateUser = () => {
  return useCustomMutation<User, CreateUserData>({
    mutationFn: createUserService,
    messages: {
      success: "Utilisateur créé avec succès",
      error: "Erreur lors de la création",
    },
    invalidateQueries: ["users-list"],
  });
};
```

## Avantages du hook réutilisable

1. **Code DRY**: Plus besoin de répéter la logique de gestion des erreurs, loading, etc.
2. **Cohérence**: Toutes les mutations suivent le même pattern
3. **Flexibilité**: Possibilité de personnaliser chaque aspect
4. **Maintenance**: Un seul endroit pour modifier la logique commune
5. **Type Safety**: Support complet de TypeScript avec types stricts
6. **Intégration**: Compatible avec votre système de toast et loading existant
7. **Invalidation dynamique**: Support des clés avec paramètres dynamiques
