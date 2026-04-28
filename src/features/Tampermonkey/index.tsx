"use client";

import InputText from "@/components/common/InputText";
import React, { useMemo, useState } from "react";

const tabs = [
  { id: "buy-tab", label: "BUY" },
  { id: "sell-tab", label: "SELL" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type SymbolOption = {
  id: string;
  label: string;
  userId: number;
  note?: string;
};

type PaymentMethodOption = {
  value: number;
  label: string;
};

type contracustOption = {
  value: string;
  label: string;
};

type ApiUserResponse = {
  odrOrderVol?: string;
  odrOrderPrice?: string;
  address?: {
    country?: string;
  };
};

const SymbolOptions: SymbolOption[] = [
  {
    id: "symbol-1",
    label: "TNF32101",
    userId: 1,
    note: "Auto fill data for BUY tab",
  },
  {
    id: "symbol-2",
    label: "TNF32102",
    userId: 2,
    note: "Auto fill data for SELL tab",
  },
  {
    id: "symbol-3",
    label: "TNF32103",
    userId: 3,
    note: "Another sample profile",
  },
];

const paymentMethodOptions: PaymentMethodOption[] = [
  {
    value: 1,
    label: "Thanh toán ngay",
  },
  {
    value: 2,
    label: "Thanh toán cuối ngày",
  },
  {
    value: 3,
    label: "Thanh toán tương lai",
  },
];

const contracustOptions: contracustOption[] = [
  {
    value: "001",
    label: "Cty 001",
  },
  {
    value: "088",
    label: "Cty 088",
  },
  {
    value: "090",
    label: "Cty 090",
  },
];

const TampermonkeyComp = () => {
  const [activeTab, setActiveTab] = useState<TabId>("buy-tab");
  const [selectedSampleId, setSelectedSampleId] = useState("");
  const [odrOrderVol, setOdrOrderVol] = useState("");
  const [odrOrderPrice, setOdrOrderPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<number | "">("");
  const [symbolDropdownDisplay, setSymbolDropdownDisplay] = useState<"none" | "block">(
    "none",
  );
  const [paymentMethodDropdownDisplay, setPaymentMethodDropdownDisplay] = useState<"none" | "block">(
    "none",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethodSearchTerm, setPaymentMethodSearchTerm] = useState("");
  const [isFetchingSample, setIsFetchingSample] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [odrSendAccount, setOdrSendAccount] = useState("088");

  const [odrRevAccount, setOdrRevAccount] = useState("088");

  const [contracust, setContracust] = useState("");
  const [contracustDropdownDisplay, setContracustDropdownDisplay] = useState<"none" | "block">(
    "none",
  );
  const [contracustSearchTerm, setContracustSearchTerm] = useState("");

  const selectedSample = SymbolOptions.find(
    (option) => option.id === selectedSampleId,
  );

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return SymbolOptions;
    }

    return SymbolOptions.filter((option) => {
      return (
        option.label.toLowerCase().includes(normalizedSearch) ||
        (option.note?.toLowerCase().includes(normalizedSearch) ?? false)
      );
    });
  }, [searchTerm]);

  const filteredPaymentMethodOptions = useMemo(() => {
    const normalizedSearch = paymentMethodSearchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return paymentMethodOptions;
    }

    return paymentMethodOptions.filter((option) => {
      return option.label.toLowerCase().includes(normalizedSearch);
    });
  }, [paymentMethodSearchTerm]);

  const filteredContracustOptions = useMemo(() => {
    const normalizedSearch = contracustSearchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return contracustOptions;
    }

    return contracustOptions.filter((option) => {
      return option.label.toLowerCase().includes(normalizedSearch);
    });
  }, [contracustSearchTerm]);

  const handleSelectProfile = async (option: SymbolOption) => {
    setSelectedSampleId(option.id);
    setSymbolDropdownDisplay("none");
    setSearchTerm("");
    setFetchError("");

    try {
      setIsFetchingSample(true);
      const response = await fetch(
        `https://dummyjson.com/users/${option.userId}`,
      );

      if (!response.ok) {
        throw new Error("Cannot fetch sample user data");
      }

      const userData: ApiUserResponse = await response.json();
      // setOdrOrderVol(userData.odrOrderVol ?? "");
      // setOdrOrderPrice(userData.odrOrderPrice ?? "");
    } catch (error) {
      setFetchError(
        error instanceof Error ? error.message : "Unknown fetch error",
      );
    } finally {
      setIsFetchingSample(false);
    }
  };

  const handleSelectPaymentMethod = (option: PaymentMethodOption) => {
    setPaymentMethod(option.value);
    setPaymentMethodDropdownDisplay("none");
    setPaymentMethodSearchTerm("");
  };

  const handleSelectContracust = (option: contracustOption) => {
    setContracust(option.value);
    setContracustDropdownDisplay("none");
    setContracustSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-(--surface-page) px-4 py-10 text-(--text-primary)">
      <div className="mx-auto w-full max-w-md rounded-xl border border-(--border-default) bg-(--surface-card) p-5 shadow-sm">
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-(--surface-subtle) p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isBuyTab = tab.id === "buy-tab";
            const buyTabClassName = isActive
              ? "bg-green-500 text-emerald-100 shadow-sm"
              : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700";
            const sellTabClassName = isActive
              ? "bg-rose-500 text-olive-100 shadow-sm"
              : "text-rose-600 hover:bg-rose-50 hover:text-rose-700";

            return (
              <button
                key={tab.id}
                id={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isBuyTab ? buyTabClassName : sellTabClassName
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <form action="" className="space-y-4">
          <p className="text-sm text-(--text-muted) wrap-break-word whitespace-normal">
            Typing: side=BUYI&code=TNF32102&paymentmethod=GN&vol=19&price=14230137&acctbuy=088C030474&contracust=088&contraacct=088C098351
          </p>

          {/* Symbol */}
          <div>
            <label className="mb-2 block text-sm font-medium">Symbol</label>
            <div className="relative">
              <button
                id="odr-symbol"
                type="button"
                aria-haspopup="listbox"
                onClick={() =>
                  setSymbolDropdownDisplay((current) =>
                    current === "none" ? "block" : "none",
                  )
                }
                className="flex w-full items-center justify-between rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-left text-sm text-(--text-primary) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
              >
                <span
                  className={
                    selectedSample ? "truncate" : "text-(--text-muted)"
                  }
                >
                  {selectedSample
                    ? selectedSample.label
                    : "Choose one profile to auto-fill"}
                </span>
                <span className="ml-3 text-(--text-muted)">▾</span>
              </button>

              <div
                style={{ display: symbolDropdownDisplay }}
                className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 rounded-xl border border-(--border-default) bg-(--surface-card) p-3 shadow-lg"
              >
                <div className="mb-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search profile..."
                    className="w-full rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-sm text-(--text-primary) outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
                  />
                </div>

                <div className="max-h-60 overflow-auto">
                  {filteredOptions.length > 0 ? (
                    <ul role="listbox" className="space-y-1">
                      {filteredOptions.map((option) => (
                        <li key={option.id}>
                          <label className="flex w-full cursor-pointer items-start gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-(--surface-subtle)">
                            <input
                              type="radio"
                              value={option.id}
                              checked={selectedSampleId === option.id}
                              onChange={() => handleSelectProfile(option)}
                              className="mt-1"
                            />
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-2 text-sm text-(--text-muted)">
                      No profile found
                    </p>
                  )}
                </div>

                {isFetchingSample ? (
                  <p className="mt-3 text-xs text-(--text-muted)">
                    Loading profile...
                  </p>
                ) : null}
                {fetchError ? (
                  <p className="mt-3 text-xs text-(--error)">{fetchError}</p>
                ) : null}
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
            >
              Price:
            </label>
            <InputText
              id="odr-order-qtty"
              value={odrOrderVol}
              onChange={(event) => setOdrOrderVol(event.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
            >
              Quantity:
            </label>
            <InputText
              id="odr-order-price"
              value={odrOrderPrice}
              onChange={(event) => setOdrOrderPrice(event.target.value)}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="mb-2 block text-sm font-medium">Payment Method</label>
            <div className="relative">
              <button
                id="odr-sett-method"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={paymentMethodDropdownDisplay === "block"}
                onClick={() =>
                  setPaymentMethodDropdownDisplay((current) =>
                    current === "none" ? "block" : "none",
                  )
                }
                className="flex w-full items-center justify-between rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-left text-sm text-(--text-primary) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
              >
                <span className={paymentMethod ? "truncate" : "text-(--text-muted)"}>
                  {paymentMethod
                    ? paymentMethodOptions.find((option) => option.value === paymentMethod)?.label ?? "Choose payment method"
                    : "Choose payment method"}
                </span>
                <span className="ml-3 text-(--text-muted)">▾</span>
              </button>

              <div
                style={{ display: paymentMethodDropdownDisplay }}
                className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 rounded-xl border border-(--border-default) bg-(--surface-card) p-3 shadow-lg"
              >
                <div className="mb-3">
                  <input
                    type="text"
                    value={paymentMethodSearchTerm}
                    onChange={(event) => setPaymentMethodSearchTerm(event.target.value)}
                    placeholder="Search payment method..."
                    className="w-full rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-sm text-(--text-primary) outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
                  />
                </div>

                <div className="max-h-60 overflow-auto">
                  {filteredPaymentMethodOptions.length > 0 ? (
                    <ul role="listbox" className="space-y-1">
                      {filteredPaymentMethodOptions.map((option) => (
                        <li key={option.value}>
                          <label className="flex w-full cursor-pointer items-start gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-(--surface-subtle)">
                            <input
                              type="radio"
                              value={option.value}
                              checked={paymentMethod === option.value}
                              onChange={() => handleSelectPaymentMethod(option)}
                              className="mt-1"
                            />
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-2 text-sm text-(--text-muted)">No payment method found</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Send Account */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
            >
              STK đặt lệnh:
            </label>
            <InputText
              id="odr-send-account"
              value={odrSendAccount}
              onChange={(event) => setOdrSendAccount(event.target.value)}
            />
          </div>

          {/* contracust - Thành viên đối ứng */}
          <div>
            <label className="mb-2 block text-sm font-medium">Thành viên đối ứng</label>
            <div className="relative">
              <button
                id="odr-rev-party"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={contracustDropdownDisplay === "block"}
                onClick={() =>
                  setContracustDropdownDisplay((current) =>
                    current === "none" ? "block" : "none",
                  )
                }
                className="flex w-full items-center justify-between rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-left text-sm text-(--text-primary) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
              >
                <span className={contracust ? "truncate" : "text-(--text-muted)"}>
                  {contracust
                    ? contracustOptions.find((option) => option.value === contracust)?.label ?? "Choose member"
                    : "Choose member"}
                </span>
                <span className="ml-3 text-(--text-muted)">▾</span>
              </button>

              <div
                style={{ display: contracustDropdownDisplay }}
                className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-20 rounded-xl border border-(--border-default) bg-(--surface-card) p-3 shadow-lg"
              >
                <div className="mb-3">
                  <input
                    type="text"
                    value={contracustSearchTerm}
                    onChange={(event) => setContracustSearchTerm(event.target.value)}
                    placeholder="Search member..."
                    className="w-full rounded-lg border border-(--border-strong) bg-(--surface-page) px-3 py-2 text-sm text-(--text-primary) outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)"
                  />
                </div>

                <div className="max-h-60 overflow-auto">
                  {filteredContracustOptions.length > 0 ? (
                    <ul role="listbox" className="space-y-1">
                      {filteredContracustOptions.map((option) => (
                        <li key={option.value}>
                          <label className="flex w-full cursor-pointer items-start gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-(--surface-subtle)">
                            <input
                              type="radio"
                              value={option.value}
                              checked={contracust === option.value}
                              onChange={() => handleSelectContracust(option)}
                              className="mt-1"
                            />
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-2 text-sm text-(--text-muted)">No member found</p>
                  )}
                </div>
              </div>
            </div>
          </div>

           {/* Order Send Account */}
          <div>
            <label
              className="mb-2 block text-sm font-medium"
            >
              STK đối ứng:
            </label>
            <InputText
              id="odr-rev-account"
              value={odrRevAccount}
              onChange={(event) => setOdrRevAccount(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-(--button-primary-bg) px-4 py-2 text-sm font-medium text-(--text-on-accent) transition-colors hover:bg-(--button-primary-bg-hover)"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default TampermonkeyComp;
