import { baseUrl } from "@/app/utils/baseUrl";
import dashboardEndPointsInterface from "./interfaces";

export const dashboardEndPoints: dashboardEndPointsInterface = {
  profile: {
    showProfile: `${baseUrl}/staff/show-profile?t=${new Date().getTime()}`,
    updateProfile: `${baseUrl}/staff/update-profile?t=${new Date().getTime()}`,
  },
  categories: {
    allCategories: `${baseUrl}/categories?t=${new Date().getTime()}`,
    singleCategory: (id?: string) => `${baseUrl}/categories/${id}?t=${new Date().getTime()}`,
  },
  brands: {
    allBrands: `${baseUrl}/brands?t=${new Date().getTime()}`,
  },
  orders: {
    allOrders: `${baseUrl}/staff/orders?t=${new Date().getTime()}`,
    singleOrder: (id?: string) => `${baseUrl}/staff/orders/${id}?t=${new Date().getTime()}`,
  },
  unitsMeasures: {
    allUnitsMeasures: `${baseUrl}/units-of-measure?t=${new Date().getTime()}`,
  },
  products: {
    allProducts: `${baseUrl}/staff/products?t=${new Date().getTime()}`,
    singleProduct: (id?: string) => `${baseUrl}/staff/products/${id}?t=${new Date().getTime()}`,
    createProduct: `${baseUrl}/staff/products?t=${new Date().getTime()}`,
    filterProducts: `${baseUrl}/staff/filter-products`,
    updateProduct: (id?: string) => `${baseUrl}/staff/update-product-status/${id}?t=${new Date().getTime()}`,
    deleteProduct: (id?: string) => `${baseUrl}/staff/products/${id}?t=${new Date().getTime()}`,
  },
  rolesAndPermissions: {
    allowedPermissions: `${baseUrl}/staff/permissions?t=${new Date().getTime()}`,
    allRoles: `${baseUrl}/staff/roles?t=${new Date().getTime()}`,
    filterRoles: `${baseUrl}/staff/filter-roles?t=${new Date().getTime()}`,
    createRole: `${baseUrl}/staff/roles?t=${new Date().getTime()}`,
    oneRole: (id?: string) => `${baseUrl}/staff/roles/${id}`,
    updateRole: (id?: string) => `${baseUrl}/staff/roles/${id}?t=${new Date().getTime()}`,
    deleteRole: (id?: string) => `${baseUrl}/staff/roles/${id}?t=${new Date().getTime()}`,
  },
  staff: {
    allStaff: `${baseUrl}/staff/staff?t=${new Date().getTime()}`,
    filterStaff: `${baseUrl}/staff/filter-staff`,
    allowedRoles: `${baseUrl}/staff/allowed-roles?t=${new Date().getTime()}`,
    createStaff: `${baseUrl}/staff/staff?t=${new Date().getTime()}`,
    updateStaff: (id?: string) => `${baseUrl}/staff/staff/${id}`,
    updateStaffStatus: (id?: string) => `${baseUrl}/staff/update-staff-status/${id}?t=${new Date().getTime()}`,
    deleteStaff: (id?: string) => `${baseUrl}/staff/staff/${id}?t=${new Date().getTime()}`,
  },
};
