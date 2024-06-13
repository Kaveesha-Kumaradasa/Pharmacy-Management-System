import  { useState, useEffect } from 'react';
import axios from 'axios';

const AddAll = () => {
  const [generics, setGenerics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dosageTypes, setDosageTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genericName, setGenericName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [editingGeneric, setEditingGeneric] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingDosageType, setEditingDosageType] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://localhost:8800/server/others/generics')
        .then(res => setGenerics(res.data))
        .catch(err => console.error('Error fetching generics:', err));

      axios.get('http://localhost:8800/server/others/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.error('Error fetching categories:', err));

      axios.get('http://localhost:8800/server/others/dosage-types')
        .then(res => setDosageTypes(res.data))
        .catch(err => console.error('Error fetching dosage types:', err));

      axios.get('http://localhost:8800/server/others/brands')
        .then(res => setBrands(res.data))
        .catch(err => console.error('Error fetching brands:', err));
    };

    fetchData();
  }, []);

  const handleGenericSubmit = (e) => {
    e.preventDefault();
    if (editingGeneric) {
      axios.put(`http://localhost:8800/server/others/generics/${editingGeneric.generic_id}`, { generic_name: genericName })
        .then(() => {
          setGenerics(generics.map(generic => generic.generic_id === editingGeneric.generic_id ? { ...generic, generic_name: genericName } : generic));
          setEditingGeneric(null);
          setGenericName('');
        })
        .catch(err => console.error('Error updating generic:', err));
    } else {
      axios.post('http://localhost:8800/server/others/generics', { generic_name: genericName })
        .then(res => setGenerics([...generics, res.data]))
        .catch(err => console.error('Error adding generic:', err));
      setGenericName('');
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      axios.put(`http://localhost:8800/server/others/categories/${editingCategory.cat_id}`, { name: categoryName })
        .then(() => {
          setCategories(categories.map(category => category.cat_id === editingCategory.cat_id ? { ...category, name: categoryName } : category));
          setEditingCategory(null);
          setCategoryName('');
        })
        .catch(err => console.error('Error updating category:', err));
    } else {
      axios.post('http://localhost:8800/server/others/categories', { name: categoryName })
        .then(res => setCategories([...categories, res.data]))
        .catch(err => console.error('Error adding category:', err));
      setCategoryName('');
    }
  };

  const handleDosageTypeSubmit = (e) => {
    e.preventDefault();
    if (editingDosageType) {
      axios.put(`http://localhost:8800/server/others/dosage-types/${editingDosageType.type_id}`, { name: typeName })
        .then(() => {
          setDosageTypes(dosageTypes.map(type => type.type_id === editingDosageType.type_id ? { ...type, name: typeName } : type));
          setEditingDosageType(null);
          setTypeName('');
        })
        .catch(err => console.error('Error updating dosage type:', err));
    } else {
      axios.post('http://localhost:8800/server/others/dosage-types', { name: typeName })
        .then(res => setDosageTypes([...dosageTypes, res.data]))
        .catch(err => console.error('Error adding dosage type:', err));
      setTypeName('');
    }
  };

  const handleBrandSubmit = (e) => {
    e.preventDefault();
    if (editingBrand) {
      axios.put(`http://localhost:8800/server/others/brands/${editingBrand.brand_id}`, { name: brandName })
        .then(() => {
          setBrands(brands.map(brand => brand.brand_id === editingBrand.brand_id ? { ...brand, name: brandName } : brand));
          setEditingBrand(null);
          setBrandName('');
        })
        .catch(err => console.error('Error updating brand:', err));
    } else {
      axios.post('http://localhost:8800/server/others/brands', { name: brandName })
        .then(res => setBrands([...brands, res.data]))
        .catch(err => console.error('Error adding brand:', err));
      setBrandName('');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Edit Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Generics</h3>
          <form onSubmit={handleGenericSubmit} className="flex flex-col">
            <input
              type="text"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              placeholder="Generic Name"
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {editingGeneric ? 'Update Generic' : 'Add Generic'}
            </button>
          </form>
          <ul className="list-disc pl-5 mb-4">
            {generics.map(generic => (
              <li key={generic.generic_id}>
                {generic.generic_name}
                <button
                  onClick={() => { setEditingGeneric(generic); setGenericName(generic.generic_name); }}
                  className="ml-2 text-blue-500">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Categories</h3>
          <form onSubmit={handleCategorySubmit} className="flex flex-col">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category Name"
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </form>
          <ul className="list-disc pl-5 mb-4">
            {categories.map(category => (
              <li key={category.cat_id}>
                {category.name}
                <button
                  onClick={() => { setEditingCategory(category); setCategoryName(category.name); }}
                  className="ml-2 text-blue-500">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Dosage Types</h3>
          <form onSubmit={handleDosageTypeSubmit} className="flex flex-col">
            <input
              type="text"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder="Dosage Type Name"
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {editingDosageType ? 'Update Dosage Type' : 'Add Dosage Type'}
            </button>
          </form>
          <ul className="list-disc pl-5 mb-4">
            {dosageTypes.map(type => (
              <li key={type.type_id}>
                {type.name}
                <button
                  onClick={() => { setEditingDosageType(type); setTypeName(type.name); }}
                  className="ml-2 text-blue-500">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Brands</h3>
          <form onSubmit={handleBrandSubmit} className="flex flex-col">
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Brand Name"
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {editingBrand ? 'Update Brand' : 'Add Brand'}
            </button>
          </form>
          <ul className="list-disc pl-5 mb-4">
            {brands.map(brand => (
              <li key={brand.brand_id}>
                {brand.name}
                <button
                  onClick={() => { setEditingBrand(brand); setBrandName(brand.name); }}
                  className="ml-2 text-blue-500">Edit</button>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default AddAll;
