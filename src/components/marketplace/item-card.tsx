'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  category: string;
  location?: string;
}

export function ItemCard({
  id,
  title,
  price,
  imageUrl,
  category,
  location = 'Palo Alto, CA',
}: ItemCardProps) {
  return (
    <Card className="hover:shadow-md transition duration-200 overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
        />
      )}
      <CardHeader className="pb-2">
        <h3 className="text-base font-semibold truncate">{title}</h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full text-sm">
          <Link href={`/item/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
