import { db } from '@/lib/db';

export type CTAPopupData = {
  id: string;
  title: string;
  imageUrl?: string;
  linkUrl: string;
  displayRule: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  displayPages?: string[];
  excludePages?: string[];
  createdAt: string;
  updatedAt: string;
};

export const ctaService = {
  async list() {
    const popups = await db.cTAPopup.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return popups.map((popup) => ({
      id: popup.id,
      title: popup.title,
      imageUrl: popup.imageUrl || undefined,
      linkUrl: popup.linkUrl,
      displayRule: popup.displayRule,
      isActive: popup.isActive,
      startDate: popup.startDate?.toISOString(),
      endDate: popup.endDate?.toISOString(),
      displayPages: popup.displayPages ? JSON.parse(popup.displayPages) : undefined,
      excludePages: popup.excludePages ? JSON.parse(popup.excludePages) : undefined,
      createdAt: popup.createdAt.toISOString(),
      updatedAt: popup.updatedAt.toISOString(),
    }));
  },

  async getById(id: string) {
    const popup = await db.cTAPopup.findUnique({ where: { id } });
    if (!popup) return null;

    return {
      id: popup.id,
      title: popup.title,
      imageUrl: popup.imageUrl || undefined,
      linkUrl: popup.linkUrl,
      displayRule: popup.displayRule,
      isActive: popup.isActive,
      startDate: popup.startDate?.toISOString(),
      endDate: popup.endDate?.toISOString(),
      displayPages: popup.displayPages ? JSON.parse(popup.displayPages) : undefined,
      excludePages: popup.excludePages ? JSON.parse(popup.excludePages) : undefined,
      createdAt: popup.createdAt.toISOString(),
      updatedAt: popup.updatedAt.toISOString(),
    };
  },

  async create(data: {
    title: string;
    imageUrl?: string;
    linkUrl: string;
    displayRule: string;
    displayPages?: string[];
    excludePages?: string[];
    startDate?: Date;
    endDate?: Date;
  }) {
    const popup = await db.cTAPopup.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        displayRule: data.displayRule,
        displayPages: data.displayPages ? JSON.stringify(data.displayPages) : null,
        excludePages: data.excludePages ? JSON.stringify(data.excludePages) : null,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: true,
      },
    });

    return {
      id: popup.id,
      title: popup.title,
      imageUrl: popup.imageUrl || undefined,
      linkUrl: popup.linkUrl,
      displayRule: popup.displayRule,
      isActive: popup.isActive,
      startDate: popup.startDate?.toISOString(),
      endDate: popup.endDate?.toISOString(),
      displayPages: popup.displayPages ? JSON.parse(popup.displayPages) : undefined,
      excludePages: popup.excludePages ? JSON.parse(popup.excludePages) : undefined,
      createdAt: popup.createdAt.toISOString(),
      updatedAt: popup.updatedAt.toISOString(),
    };
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      imageUrl?: string;
      linkUrl: string;
      displayRule: string;
      isActive: boolean;
      displayPages?: string[];
      excludePages?: string[];
      startDate?: Date;
      endDate?: Date;
    }>
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...data };
    if (data.displayPages) updateData.displayPages = JSON.stringify(data.displayPages);
    if (data.excludePages) updateData.excludePages = JSON.stringify(data.excludePages);

    const popup = await db.cTAPopup.update({
      where: { id },
      data: updateData,
    });

    return {
      id: popup.id,
      title: popup.title,
      imageUrl: popup.imageUrl || undefined,
      linkUrl: popup.linkUrl,
      displayRule: popup.displayRule,
      isActive: popup.isActive,
      startDate: popup.startDate?.toISOString(),
      endDate: popup.endDate?.toISOString(),
      displayPages: popup.displayPages ? JSON.parse(popup.displayPages) : undefined,
      excludePages: popup.excludePages ? JSON.parse(popup.excludePages) : undefined,
      createdAt: popup.createdAt.toISOString(),
      updatedAt: popup.updatedAt.toISOString(),
    };
  },

  async delete(id: string) {
    await db.cTAPopup.delete({ where: { id } });
  },

  async getActiveForPage(pathname: string) {
    const now = new Date();
    const popups = await db.cTAPopup.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null },
          { startDate: { lte: now } },
        ],
        AND: [
          {
            OR: [
              { endDate: null },
              { endDate: { gte: now } },
            ],
          },
        ],
      },
    });

    return popups
      .filter((popup) => {
        if (popup.excludePages) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const excluded = JSON.parse(popup.excludePages) as any;
          if (excluded.includes(pathname)) return false;
        }
        if (popup.displayPages) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const included = JSON.parse(popup.displayPages) as any;
          return included.includes(pathname);
        }
        return true;
      })
      .map((popup) => ({
        id: popup.id,
        title: popup.title,
        imageUrl: popup.imageUrl || undefined,
        linkUrl: popup.linkUrl,
        displayRule: popup.displayRule,
        isActive: popup.isActive,
        startDate: popup.startDate?.toISOString(),
        endDate: popup.endDate?.toISOString(),
        displayPages: popup.displayPages ? JSON.parse(popup.displayPages) : undefined,
        excludePages: popup.excludePages ? JSON.parse(popup.excludePages) : undefined,
        createdAt: popup.createdAt.toISOString(),
        updatedAt: popup.updatedAt.toISOString(),
      }));
  },
};
