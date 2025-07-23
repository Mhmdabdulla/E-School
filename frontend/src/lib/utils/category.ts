import type { Category as ICategory, Subcategory as ISubcategory } from "../../types/category"; 

export const trackCategoryChanges = (existingCategory: ICategory, updatedCategory: ICategory) => {
  const changes: any = {}; 

  // Check if the category name has changed
  if (existingCategory.name !== updatedCategory.name) {
    changes.name = updatedCategory.name; 
  }

  // Check if the category status has changed
  if (existingCategory.status !== updatedCategory.status) {
    changes.status = updatedCategory.status; // Add the status change if it's different
  }

  // Maps to compare existing and updated subcategories by their _id
  const existingSubcategoryMap = new Map<string, ISubcategory>();
  existingCategory.subcategories.forEach(sub => {
    if (sub._id) {
      existingSubcategoryMap.set(sub._id.toString(), sub);
    }
  });

  const updatedSubcategoryMap = new Map<string, ISubcategory>();
  updatedCategory.subcategories.forEach(sub => {
    if (sub._id) {
      updatedSubcategoryMap.set(sub._id.toString(), sub);
    }
  });

  // Arrays to track changes in subcategories
  const removedSubcategories: string[] = []; // Array of subcategory _id for removed subcategories
  const addedSubcategories: { name: string }[] = []; // Array of names for added subcategories
  const modifiedSubcategories: { _id: string; name: string }[] = []; // Array of modified subcategories

  // Detect removed subcategories (present in existing, not in updated)
  existingCategory.subcategories.forEach((sub) => {
    if (sub._id && !updatedSubcategoryMap.has(sub._id.toString())) {
      removedSubcategories.push(sub._id.toString());
    }
  });

  // Detect added or modified subcategories
  updatedCategory.subcategories.forEach((sub) => {
    const existingSub = existingSubcategoryMap.get(sub._id?.toString());
    if (!existingSub) {
      // New subcategory added (no _id)
      addedSubcategories.push({ name: sub.name });
    } else if (existingSub.name !== sub.name) {
      // Subcategory name has been modified
      modifiedSubcategories.push({ _id: sub._id?.toString(), name: sub.name });
    }
  });

  // Only add the subcategory changes if there is something to add
  if (removedSubcategories.length || addedSubcategories.length || modifiedSubcategories.length) {
    changes.subcategories = {};  // Ensure the subcategories key is initialized

    // Only include non-empty arrays
    if (addedSubcategories.length > 0) {
      changes.subcategories.added = addedSubcategories;
    }
    if (removedSubcategories.length > 0) {
      changes.subcategories.removed = removedSubcategories;
    }
    if (modifiedSubcategories.length > 0) {
      changes.subcategories.modified = modifiedSubcategories;
    }
  }

  return changes;
};