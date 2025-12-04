-- CreateTable
CREATE TABLE "UTA" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UTA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "US" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_change" TIMESTAMP(3) NOT NULL,
    "exp_date" TIMESTAMP(3) NOT NULL,
    "utaId" INTEGER NOT NULL,

    CONSTRAINT "US_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "utaId" INTEGER NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "utaId" INTEGER NOT NULL,
    "rqstUtaId" INTEGER NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "US" ADD CONSTRAINT "US_utaId_fkey" FOREIGN KEY ("utaId") REFERENCES "UTA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_utaId_fkey" FOREIGN KEY ("utaId") REFERENCES "UTA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_utaId_fkey" FOREIGN KEY ("utaId") REFERENCES "UTA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_rqstUtaId_fkey" FOREIGN KEY ("rqstUtaId") REFERENCES "UTA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
