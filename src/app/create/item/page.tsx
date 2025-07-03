// app/create/item/page.tsx
'use client';

import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(searchParams.get('type') || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    email: '',
    category: '',
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) setImageUrl(data.url);
      else console.error('Upload error:', data.error);
    } catch (err) {
      console.error('Upload error:', err);
    }

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent | any) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file) handleUpload(file);
  };

  const handleSubmit = async () => {
    const newErrors = {
      title: !title ? 'Title is required' : '',
      price: !price ? 'Price is required' : '',
      email: !email ? 'Email is required' : '',
      category: !category ? 'Category is required' : '',
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setLoading(true);
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description: desc,
          location,
          price: parseFloat(price),
          seller_email: email,
          category,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Post error:', data.error);
        setLoading(false);
        return;
      }

      router.push('/');
    } catch (err) {
      console.error('Network error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New Listing</h1>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label>Price ($)</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div className="w-1/2">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(val) => {
              setCategory(val);
              setErrors((prev) => ({ ...prev, category: '' }));
            }}>
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            className={`w-full p-6 text-center border-2 border-dashed rounded-lg cursor-pointer transition ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            {uploading ? (
              <div className="flex justify-center items-center gap-2 text-sm text-blue-600">
                <Loader2 className="animate-spin w-4 h-4" /> Uploading image...
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="preview"
                className="mx-auto h-40 object-contain rounded-md"
              />
            ) : (
              <p className="text-sm text-gray-400">Click or drag & drop an image</p>
            )}
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleDrop}
            />
          </div>

          <Button className="w-full" disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Saving...
              </span>
            ) : (
              'Post Listing'
            )}
          </Button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
        <p className="text-xl font-semibold">Live Preview</p>
        {imageUrl && <img src={imageUrl} className="rounded-md h-40 object-cover w-full" />}
        <h2 className="text-lg font-medium">{title || 'Listing Title'}</h2>
        <p className="text-sm text-muted-foreground">{desc || 'Listing description will appear here.'}</p>
        <p className="text-base font-semibold">{price ? `$${price}` : '$0.00'}</p>
        <p className="text-sm text-gray-500">{email || 'seller@example.com'}</p>
      </div>
    </div>
  );
}
